import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./Dashboard.css";
import JournalModal from "../JournalModal";
import NewJournalEntry from "../NewJournalEntry";
import NewDrawEntry from "../NewDrawEntry";
import JournalEntry from "../JournalEntry"
import { fetchCurrentJournal, fetchMonthJournalEntries } from "../../store/entries";
 

const localizer = momentLocalizer(moment);

function Dashboard() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCurrentJournal())
    dispatch(fetchMonthJournalEntries())
  },[])

  const monthEntries = useSelector(state => state.entries.journals.month);
  const current = useSelector(state => state.entries.journals.current);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [entry, setEntry] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [notifText, setNotifText] = useState("")
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }, [submitted]);

  const [events, setEvents] = useState([{
            start: moment().toDate(),
            end: moment().toDate(),
            title: "Journal",
            allDay: true
          }, 
          {
            start: moment().toDate(),
            end: moment().toDate(),
            title: "Draw",
            allDay: true
          }, 
        ]);

  useEffect(() => {
    if (monthEntries && count === 1) {
      setEvents([...events,
      ...Object.values(monthEntries).map((entry, idx) => {
        // if (idx !==  Object.values(monthEntries).length - 1 ) {
        return {
          id: entry.id,
          start: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
          end: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
          title: "Journal",
          allDay: true
        }
        // }
        // {
        //   start: moment(entry.created_at).toDate(),
        //   end: moment(entry.created_at).toDate(),
        //   title: "Draw"
        // },
        // {
        //   start: moment(entry.created_at).toDate(),
        //   end: moment(entry.created_at).toDate(),
        //   title: "Comment"
        // },
        // ]
      })
      ])
     
    }
     setCount(count + 1)
    console.log(events)
  }, [monthEntries]);


  useEffect(() => {
    // if (moment(events[events.length - 1].start).date() === moment().date() && count === 2) {
    //     setEvents(events.slice(1))
    //   }
    if(current && count == 1) {
      setEvents(events.slice(1))
    }
  },[current])
  
  const eventClick = (event) => {
    setEntry(monthEntries[event.id])
    switch (event.title) {
      case "Journal":
        setModalOpen(true);
        if (moment(event.start).date() === moment().date()) {
          setModalType(1);
        } else {
          setModalType(4)
        }
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
          {modalType === 4 && <JournalEntry entry={entry} />}
        {modalType === 2 && <NewDrawEntry />}
        {/* {modalType === 3 && <NewComment />} */}
      </JournalModal>
    </>
  )
};

export default Dashboard;