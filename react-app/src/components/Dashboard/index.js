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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        onSelectEvent={(event) => eventClick(event)}

        style={{ height: "80vh" }}
      />
      <JournalModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === 1 && <NewJournalEntry onClose={() => setModalOpen(false)}/>}
        {/* {modalType === 2 && <DrawEntry />}
        {modalType === 3 && <NewComment />} */}
      </JournalModal>
    </>
  )
}

export default Dashboard;