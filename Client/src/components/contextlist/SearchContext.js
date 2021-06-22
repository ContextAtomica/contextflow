import React, { useEffect, useState } from "react";
import AnchoredHeader from "../contextlist/AnchoredHeader";
import { getAllContextFlow } from "../../client-api/contextflow";
import ContextRow from "./contextrow/ContextRow";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./context_flow.css";
import match from "autosuggest-highlight/match";
import _ from "lodash";
const SearchContext = () => {
  const [searchDomain, setsearchDomain] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFlow, setsearchFlow] = useState("");
  const [atnentities, setAtnentities] = useState("");
  const [contextData, setContextData] = useState([]);
  const [add, setAdd] = useState(true);
  const [addModule] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const data = await getAllContextFlow();
      setContextData(data.data.arr);
      setSearchResults(data.data.arr);
    })();
  }, [refresh]);

  const handleSearchDomain = (event) => {
    setsearchDomain(event.target.value);
  };
  const handleSearchFlow = (event) => {
    setsearchFlow(event.target.value);
  };
  const handleAtnEntities = (event) => {
    setAtnentities(event.target.value);
  };

  const searchContext = () => {
    if (searchDomain || searchFlow || atnentities) {
      const re = new RegExp(_.escapeRegExp(atnentities), "i");
      const results = contextData.filter(
        (context) =>
          context.domain.toLowerCase().includes(searchDomain) &&
          context.flow.toLowerCase().includes(searchFlow) &&
          context.atttentionentities.some((item) => {
            if (re.test(item)) {
              match(item, atnentities);
              // item["parts"] = parse(item, matches);
              return true;
            } else {
              return false;
            }
          })
      );

      setSearchResults(results);
    }
  };
  return (
    <Container fluid>
      <Row style={{ width: "85%", margin: "auto" }}>
        <Col lg={4} xs={12}>
          <Form>
            <Form.Group>
              <Form.Label>
                <b>Enter Domain</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Domain"
                value={searchDomain}
                onChange={handleSearchDomain}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col lg={4} xs={12}>
          <Form>
            <Form.Group>
              <Form.Label>
                <b>Enter Flow</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Flow"
                value={searchFlow}
                onChange={handleSearchFlow}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col lg={4} xs={12}>
          <Form>
            <Form.Group>
              <Form.Label>
                <b>Enter attentionentities</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter context"
                value={atnentities}
                onChange={handleAtnEntities}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col
          style={{ marginLeft: "40%", marginBottom: "30px" }}
          xs={12}
          lg={12}
        >
          <Button
            onClick={() => {
              searchContext();
            }}
          >
            Search
          </Button>
        </Col>
      </Row>

      <div className="context-wrapper">
        <AnchoredHeader setAdd={setAdd} add={add} addModule={addModule} />
        {searchResults.map((context, index) => (
          <div key={index}>
            <ContextRow context={context} setRefresh={setRefresh} />
          </div>
        ))}
      </div>
    </Container>
  );
};
export default SearchContext;
