import { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { getAllContextDomain } from "../../../client-api/contextflow";
import { UserContext } from "../../../provider/UserProvider";
import right from "../../../assets/right.jpg";
import { getRpByDomain } from "../../../client-api/contextflow";
import { ANCHOR_DB } from "../../../constants/Anchor.constant";
const AddData = () => {
  const value = useContext(UserContext);
  const [userData] = value.user;
  const [pattern, setPattern] = useState([]);
  const [Alldomain, setAllDomain] = useState([]);
  const [selectDomain, setSelectDomain] = useState();
  const [currentRp, setCurrentRp] = useState();

  if (currentRp !== undefined) {
    sessionStorage.setItem(
      ANCHOR_DB.RESOLUTION_PATTERN,
      JSON.stringify({
        anchor: currentRp.resolution_pattern,
        label: currentRp.resolution_pattern,
      })
    );
    sessionStorage.setItem(
      ANCHOR_DB.USER_ANCHOR,
      JSON.stringify({
        anchor: currentRp.user_anchor,
        label: currentRp.user_anchor,
      })
    );
    sessionStorage.setItem(
      ANCHOR_DB.FLOW_ANCHOR,
      JSON.stringify({
        anchor: currentRp.flow_anchor,
        label: currentRp.flow_anchor,
      })
    );

    sessionStorage.setItem(
      ANCHOR_DB.DOMAIN_ANCHOR,
      JSON.stringify({
        anchor: currentRp.domain_anchor,
        label: currentRp.domain_anchor,
      })
    );
    sessionStorage.setItem(
      ANCHOR_DB.ENTITY_ANCHOR,
      JSON.stringify({
        anchor: currentRp.entity_anchor,
        label: currentRp.entity_anchor,
      })
    );
  }

  useEffect(() => {
    (async () => {
      await getAllContextDomain().then((result) => {
        setAllDomain(result.data);
      });
    })();
  }, []);

  const setCurrentDomain = async (d) => {
    setSelectDomain(d);
    await getRpByDomain(d).then((res) => {
      setPattern(res.data);
    });
  };
  return (
    <div className="main-page">
      {userData.user !== undefined ? (
        <>
          <div className="content-div">
            <h1 className="heading-div">Context Flow</h1>
            <h1 className="heading-div">
              UID:{userData.user !== null && userData.user._id}
            </h1>
          </div>
          <div>
            <ul className="display-content">
              <li className="content-data">
                {selectDomain && <>{`Domain : ${selectDomain}`}</>}
              </li>
              <li className="content-data">
                {currentRp && (
                  <>
                    {`useranchor : ${currentRp.user_anchor}`} <br />
                    {`flowanchor : ${currentRp.flow_anchor}`} <br />
                    {`entityanchor : ${currentRp.entity_anchor}`} <br />
                    {`resoltioncurrentRp : ${currentRp.resolution_pattern}`}{" "}
                    <br />
                  </>
                )}
              </li>
            </ul>
          </div>
          <Row>
            <Col>
              <div className="listbox-area">
                <span className="listbox-label">SELECT DOMAIN</span>
                {Alldomain.map((d) => (
                  <li
                    className={
                      d !== selectDomain ? "domain-list" : "selected-domain"
                    }
                    onClick={() => {
                      setCurrentDomain(d);
                    }}
                    key={d}
                  >
                    {d !== selectDomain ? (
                      " "
                    ) : (
                      <img className="mark-img" src={right} alt="mark" />
                    )}
                    {d}
                  </li>
                ))}
              </div>
            </Col>
            <Col>
              <div className="listbox-area">
                <span className="listbox-label">SELECT PATTERN</span>
                {pattern.length > 0 ? (
                  <>
                    {pattern.map((d, i) => (
                      <li
                        onClick={() => {
                          setCurrentRp(d);
                        }}
                        key={i}
                        className={d !== currentRp ? "rp-list" : "selected-rp"}
                      >
                        {d !== currentRp ? (
                          " "
                        ) : (
                          <img className="mark-img" src={right} alt="mark" />
                        )}
                        {d.resolution_pattern}
                      </li>
                    ))}
                  </>
                ) : null}
              </div>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddData;
