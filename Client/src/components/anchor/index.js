import React, { useEffect, useState } from "react";
import SelectCurd from "../select/index";
import "./anchor.css";
import ErrorNotice from "../Notify/ErrorNotice";
import { saveResolutionPattern } from "../../client-api/anchor";
import { getResolutionPattern } from "../../client-api/anchor";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ANCHOR_DB } from "../../constants/Anchor.constant";
const Anchor = () => {
  const [domain, setDomain] = useState();
  const [resolution, setResolution] = useState(false);
  const [flow, setFlow] = useState();
  const [entity, setEntity] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [ResolutionPattern, setResolutionPattern] = useState();
  const [data, setData] = useState([]);
  const [domainValue, setDomainValue] = useState();
  const [flowValue, setFlowValue] = useState();
  const [entityValue, setEntityValue] = useState();
  const savePatternToDb = () => {
    if (domain && flow && ResolutionPattern && user) {
      var obj = {
        domainAnchor: domain.anchor,
        flowAnchor: flow.anchor,
        resolutionPattern: ResolutionPattern.anchor,
        userAnchor: user.anchor,
        entity_anchor: entity.anchor,
      };

      saveResolutionPattern(obj)
        .then((res) => {
          setError(res.data.err);
          setResolution(false);
        })
        .catch((err) => {
          console.log(err);
          setResolution(false);
        });
    } else {
      alert("please select all the field");
    }
  };
  useEffect(() => {
    (async () => {
      if (user && ResolutionPattern) {
        const userAnchor = {
          user_anchor: user.anchor,
          resolution: ResolutionPattern.anchor,
        };
        const list = await getResolutionPattern(userAnchor);
        setData(list.data);
      } else {
        setDomainValue(null);
        setFlowValue(null);
      }
    })();
  }, [user, ResolutionPattern]);
  useEffect(() => {
    if (data.length > 0) {
      const d = data[0];
      const domainObj = {
        anchor: d.domain_anchor,
        label: d.domain_anchor,
      };
      const flowObj = {
        anchor: d.flow_anchor,
        label: d.flow_anchor,
      };
      const entityObj = {
        anchor: d.entity_anchor,
        label: d.entity_anchor,
      };
      setDomainValue(domainObj);
      setFlowValue(flowObj);
      setEntityValue(entityObj);
      setResolution(false);
    }
  }, [data]);

  return (
    <Container fluid style={{ background: "#f0efef" }}>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {user ? (
        <div className="anchor">
          <b>user Anchor:{user.anchor}</b>
        </div>
      ) : null}
      {ResolutionPattern ? (
        <div className="anchor">
          <b>Resolution Pattern:{ResolutionPattern.anchor}</b>
        </div>
      ) : null}
      {domain ? (
        <div className="anchor">
          <b>Domain Anchor:{domain.anchor}</b>
        </div>
      ) : null}
      {flow ? (
        <div className="anchor">
          <b>Flow Anchor:{flow.anchor}</b>
        </div>
      ) : null}
      {entity ? (
        <div className="anchor">
          <b>Entity Anchor:{entity.anchor}</b>
        </div>
      ) : null}
      <Row className="anchor-row">
        <Col xs={12} lg={12} style={{ marginBottom: "30px" }}>
          <SelectCurd
            background={"MediumSeaGreen"}
            anchorType={"ResolutionPattern"}
            setResolutionPattern={setResolutionPattern}
            setResolution={setResolution}
          />
        </Col>
        <Col xs={12} lg={12} style={{ marginBottom: "30px" }}>
          <SelectCurd
            background={"navajowhite"}
            setResolution={setResolution}
            anchorType={ANCHOR_DB.USER_ANCHOR}
            setUser={setUser}
          />
        </Col>
        <Col xs={12} lg={12} style={{ marginBottom: "30px" }}>
          <SelectCurd
            background={"SlateBlue"}
            anchorType={ANCHOR_DB.DOMAIN_ANCHOR}
            setDomain={setDomain}
            setResolution={setResolution}
            domainValue={domainValue}
          />
        </Col>
        <Col xs={12} lg={12} style={{ marginBottom: "30px" }}>
          <SelectCurd
            background={"violet"}
            anchorType={ANCHOR_DB.FLOW_ANCHOR}
            setFlow={setFlow}
            setResolution={setResolution}
            flowValue={flowValue}
          />
        </Col>
        <Col xs={12} lg={12} style={{ marginBottom: "30px" }}>
          <SelectCurd
            background={"cyan"}
            anchorType={ANCHOR_DB.ENTITY_ANCHOR}
            setEntity={setEntity}
            setResolution={setResolution}
            entityValue={entityValue}
          />
        </Col>
        <div className="anchor">
          {resolution ? (
            <>
              <Button
                variant="success"
                style={{ margin: "5px" }}
                form="edit-form"
                type="submit"
                onClick={() => {
                  savePatternToDb();
                }}
              >
                save
              </Button>
              <Button variant="danger" onClick={() => setResolution(false)}>
                cancel
              </Button>
            </>
          ) : null}
        </div>
      </Row>
    </Container>
  );
};
export default Anchor;
