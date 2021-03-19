import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./Dashboard.css";
import JournalModal from "../JournalModal";
import NewJournalEntry from "../NewJournalEntry";
import NewDrawEntry from "../NewDrawEntry";
import JournalEntry from "../JournalEntry";
import DrawEntry from "../DrawEntry";
import { fetchCurrentJournal, fetchMonthJournalEntries, fetchCurrentDrawing, fetchMonthDrawings } from "../../store/entries";
 

const localizer = momentLocalizer(moment);

function Dashboard() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [calReady, setCalReady] = useState(false);
  
  useEffect(async() => {
    await dispatch(fetchCurrentJournal())
    await dispatch(fetchCurrentDrawing())
    await dispatch(fetchMonthJournalEntries()) 
    await dispatch(fetchMonthDrawings())
    setLoaded(true) 
  }, []);

  const monthJournalEntries = useSelector(state => state.entries.journals.month);
  const monthDrawings = useSelector(state => state.entries.drawings.month);
  const currentJournal = useSelector(state => state.entries.journals.current);
  const currentDrawing = useSelector(state => state.entries.drawings.current);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [entry, setEntry] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [notifText, setNotifText] = useState("");


  useEffect(() => {
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }, [submitted]);

  const [events, setEvents] = useState([{
    start: moment({hour: 0, minute: 0, seconds: 0}).toDate(),
    end: moment({hour: 0, minute: 0, seconds: 0}).toDate(),
    title: "Journal",
    value: 0
  }, {
    start: moment({hour: 0, minute: 0, seconds: 0}).toDate(),
    end: moment({hour: 0, minute: 0, seconds: 0}).toDate(),
    title: "Draw",
    value: 1
  }]);

    
  useEffect(() => {
    setEvents(events => events.sort((a, b) => a.value < b.value ? -1 : 1))
    console.log(events)
  }, [events]);
  
  useEffect(() => {
    if (newEvent) {
      setEvents(events => [...events, {
        id: currentJournal.id,
        start: moment(currentJournal.created_at.slice(0, currentJournal.created_at.length - 13)).toDate(),
        end: moment(currentJournal.created_at.slice(0, currentJournal.created_at.length - 13)).toDate(),
        title: "Journal",
        allDay: true,
        value: 0
      }]);
    }
    setNewEvent(false);
    
  }, [currentJournal]);

  useEffect(() => {
    if (loaded === true) {
      setEvents(events => [...events,
      ...Object.values(monthJournalEntries).map((entry, idx) => {
        return {
          id: entry.id,
          start: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
          end: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
          title: "Journal",
          value: 0
        }
      })
      ]);

    
      
    setEvents(events => [...events,
      ...Object.values(monthDrawings).map((drawing, idx) => {
        return {
          id: drawing.id,
          start: moment(drawing.created_at.slice(0, drawing.created_at.length - 13)).toDate(),
          end: moment(drawing.created_at.slice(0, drawing.created_at.length - 13)).toDate(),
          title: "Drawing",
          value: 1
        }
      })
      ])
      setLoaded(false)
      setCalReady(true)
    }
  }, [loaded]);



  useEffect(() => {
    if (currentJournal) {
      setEvents(events => events.filter(event => {
        return ((event.title == "Journal" && event.id) || event.title == "Draw" || event.title == "Drawing")
      }))
    };

  }, [currentJournal]);

  useEffect(() => { 
    if (currentDrawing) {
      setEvents(events.filter(event => {
        return ((event.title == "Drawing" && event.id) || event.title == "Journal")
      }))
    }
  }, [currentDrawing]);

  const eventClick = (event) => {
    
    switch (event.title) {
      
      case "Journal":
        setEntry(monthJournalEntries[event.id])
        setModalOpen(true);
        if (moment(event.start).date() === moment().date()) {
          setModalType(1);
        } else {
          setModalType(4);
        }
        break;
      case "Draw":
        setEntry(monthDrawings[event.id])
        setModalOpen(true);
        setModalType(2);
        break;
      case "Drawing":
        setEntry(monthDrawings[event.id])
        setModalOpen(true);
        setModalType(5);
        break;
      case "Comment":
        setModalOpen(true);
        setModalType(3);
      default:
        break;

    }
  };

  const addDrawing = (drawing) => {
    setEvents(events => [...events, {
      id: drawing.id,
      start: moment(drawing.created_at.slice(0, drawing.created_at.length - 13)).toDate(),
      end: moment(drawing.created_at.slice(0, drawing.created_at.length - 13)).toDate(),
      title: "Drawing",
      value: 1
    }]);
  }; 

  const addEntry = (entry) => {
    
    setEvents(events => [...events, {
      id: entry.id,
      start: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
      end: moment(entry.created_at.slice(0, entry.created_at.length - 13)).toDate(),
      title: "Journal",
      value: 0
    }]);
  }; 

  return (
    <>
    <div className={submitted ? "notification" : "notification hidden"}>{notifText}</div>
      {calReady && <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        onSelectEvent={(event) => eventClick(event)}

        style={{ position: "fixed", top: "0px", bottom: "0", left: "0", right: "0", marginTop: "110px", marginBottom: "80px"  }}
      />}
      <JournalModal draw={modalType === 2 ? true : false} open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === 1 && <NewJournalEntry events={events} addEvent={(entry) => addEntry(entry)} setSubmitted={(text) => {
          setNotifText(text)
          setTimeout(()=> {
            setSubmitted(true)
          }, 250)
          }} 
          onClose={() => setModalOpen(false)}
          />}
          {modalType === 4 && <JournalEntry entry={entry} />}
        {modalType === 2 && <NewDrawEntry addEvent={(drawing) => addDrawing(drawing)} onClose={() => setModalOpen(false)}/>}
        {modalType === 5 && <DrawEntry drawing={entry}/>}
      </JournalModal>
    </>
  )
};

export default Dashboard;