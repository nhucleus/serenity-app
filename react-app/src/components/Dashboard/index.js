import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./Dashboard.css";
import JournalModal from "../JournalModal";
import NewJournalEntry from "../NewJournalEntry";
import { fetchCurrentJournal, fetchAllJournalEntries } from "../../store/entries";
 

const localizer = momentLocalizer(moment);

function Dashboard() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCurrentJournal())
    dispatch(fetchAllJournalEntries())
  },[])
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [notifText, setNotifText] = useState("")

  useEffect(()=> {
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  },[submitted])

  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Journal"
    },
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Draw"
    },
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Comment"
    }
  ]);
  
  const eventClick = (event) => {
    switch (event.title) {
      case "Journal":
        setModalOpen(true);
        setModalType(1);
        break;
      case "Draw":
        setModalOpen(true);
        setModalType(2);
        break;
      case "Comment":
        setModalOpen(true);
        setModalType(3);
      default:
        break;
    }
  };

  return (
    <>
    <div className={submitted ? "notification" : "notification hidden"}>{notifText}</div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        onSelectEvent={(event) => eventClick(event)}

        style={{ position: "fixed", top: "0px", bottom: "0", left: "0", right: "0", "margin-top": "110px", "margin-bottom": "80px"  }}
      />
      <JournalModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === 1 && <NewJournalEntry setSubmitted={(text) => {
          setNotifText(text)
          setTimeout(()=> {
            setSubmitted(true)
          }, 250)
          
          }} onClose={() => setModalOpen(false)}/>}
        {/* {modalType === 2 && <DrawEntry />}
        {modalType === 3 && <NewComment />} */}
      </JournalModal>
    </>
  )
};

export default Dashboard;