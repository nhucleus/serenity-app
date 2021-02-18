import "./JournalEntriesList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJournalEntriesLimit } from "../../store/entries";
import InfiniteScroll from "react-infinite-scroll-component";
import JournalEntry from "../JournalEntry";
import Loader from "react-loader-spinner";

const JournalEntriesList = () => {
  const dispatch = useDispatch();
  const journalEntries = useSelector(state => state.entries.journals.list);
  const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(fetchJournalEntriesLimit(page))
    }, [dispatch, page]);

  return (
      <>
      <div className="journal-header">Your Journal</div>
    {journalEntries && (
        <InfiniteScroll
            className="journal-entries-list-container"
            dataLength={Object.values(journalEntries).length}
            next={() => setPage(page +1)}
            hasMore={true}
            loader={
                <Loader 
                    className="hearts-loader"
                    type="Hearts"
                    timeout={1000}
                    color="rgb(155, 111, 180)"

                />
            }
        >
            {Object.values(journalEntries)
                .sort((a, b) => new Date(a.created_at) < new Date(b.created_at) ? 1 : -1)
                .map((entry) => (
                    <JournalEntry entry={entry}/>
                ))
                }
        </InfiniteScroll>
    )}
    </>
  )
}

export default JournalEntriesList;