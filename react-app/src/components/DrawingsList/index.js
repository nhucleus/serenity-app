import "./DrawingsList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDrawingsLimit } from "../../store/entries";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import DrawEntry from "../DrawEntry";

const DrawingsList = () => {
  const dispatch = useDispatch();
  const drawingsList = useSelector(state => state.entries.drawings.list);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchDrawingsLimit(page))
  }, [dispatch, page]);

  return (
    <>
      <div className="drawing-header">Your Drawings</div>
      {drawingsList && (
        <InfiniteScroll
          className="drawings-list-container"
          dataLength={Object.values(drawingsList).length}
          next={() => setPage(page + 1)}
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
          {Object.values(drawingsList)
            .sort((a, b) => new Date(a.created_at) < new Date(b.created_at) ? 1 : -1)
            .map((drawing) => (
              <DrawEntry drawing={drawing} />
            ))
          }
        </InfiniteScroll>
      )}
    </>
  )
};

export default DrawingsList;