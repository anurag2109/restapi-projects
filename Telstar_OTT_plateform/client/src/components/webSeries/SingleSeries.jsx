import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSerieById,
  deleteSerieById,
} from "../../redux/actions/webSeriesAction";
import "./SingleSeriesStyle.css";
import SeriesAction from "./SeriesActions";

export const SingleSeries = ({
  getSerieById,
  serie: { serie },
  deleteSerieById,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getSerieById(id);
  }, [getSerieById, id]);

  return (
    <div className="singleseries_container">
      {serie && (
        <div style={{ color: "white" }}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8773/1028773-h-48170a73363e"
                alt="serie banner"
                style={{ height: "70vh" }}
              />
              <div>
                <div className="movieDetails">
                  <p>Movie: &nbsp; </p>
                  <p>{serie.webSeriesName}</p>
                </div>
                <div className="movieDetails">
                  <p>Languages: &nbsp;</p>
                  <p>{serie.languages}</p>
                </div>
                <div className="movieDetails">
                  <p>Total Episodes: &nbsp;</p>
                  <p>{serie.episodes}</p>
                </div>
                <div className="movieDetails">
                  <p>Genre: &nbsp;</p>
                  <p>{serie.genre}</p>
                </div>
                <div className="movieDetails">
                  <p>Director: &nbsp;</p>
                  <p>{serie.director}</p>
                </div>
                <div className="movieDetails">
                  <p>Production: &nbsp;</p>
                  <p>{serie.production}</p>
                </div>
                <SeriesAction serie={serie} deleteSerieById={deleteSerieById} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

SingleSeries.propTypes = {
  getSerieById: PropTypes.func.isRequired,
  deleteSerieById: PropTypes.func.isRequired,
  serie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  serie: state.webSeriesReducer,
});

const mapDispatchToProps = { getSerieById, deleteSerieById };

export default connect(mapStateToProps, mapDispatchToProps)(SingleSeries);
