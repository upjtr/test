import React, { useEffect, useState } from "react";
import { NavLink, withRouter, useParams } from "react-router-dom";

import { Row, Col, Button, Form } from "react-bootstrap";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { connect } from "react-redux";
import {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
} from "../../../redux/conceptProposal/action";

import Api from "../../../api/index";
import {
  getresearch_faculty,
  getbudget_type,
  getfunding_status,
  insertfunding,
  updatefunding,
  clearfunding,
  getonefunding,
} from "../../../redux/funding/action";

function EditFundingResearch(props) {
  // const form = createRef();

  const [project_type_id, setproject_type_id] = useState(""); //ประเภท
  const [
    coordinater_funding_project_name,
    setcoordinater_funding_project_name,
  ] = useState(""); //ชื่อโครงการ
  const [coordinator_project, setcoordinator_project] = useState(""); //ผู้ประสานงาน
  const [coordinater_funding_agency, setcoordinater_funding_agency] =
    useState(""); //หน่วยงานที่รับผิดชอบ
  const [project_leader, setproject_leader] = useState(""); //นักวิจัยผู้รับผิดชอบ
  const [coordinater_funding_phone, setcoordinater_funding_phone] = useState(0); //เบอร์ติดต่อ
  // const coordinater_funding_ac_research_team = []; //เลือกทีมนักวิจัย
  const [
    coordinator_fundingagency_status_id,
    setcoordinator_fundingagency_status_id,
  ] = useState(""); //สถานะโครงการ
  const [coordinater_funding_year, setcoordinater_funding_year] = useState(0); //ปีงบประมาณ
  const [coordinater_funding_budget, setcoordinater_funding_budget] =
    useState(0); //งบประมาณ
  const [coordinater_funding_name, setcoordinater_funding_name] = useState(""); //ชื่อแหล่งทุน
  const [budget_id, setbudget_id] = useState(""); // ประเภทงบประมาณ
  const [coordinator_univercity_budget, setcoordinator_univercity_budget] =
    useState(""); //รายได้เข้ามหาลัย

  const [funding, setfunding] = useState([]);
  const animatedComponents = makeAnimated();
  const researcher = [];

  const { id } = useParams();
  console.log("object", id);

  useEffect(() => {
    props.getonefunding(id);
    props.getUser();
    props.getSource_funds();
    props.getprojecttype();
    props.getyear();
    props.getresearch_faculty();
    props.getbudget_type();
    props.getfunding_status();
  }, []);

  for (const data of props.user) {
    researcher.push({
      value: data.user_idcard,
      label: data.user_first_name_th + " " + data.user_last_name_th,
    });
  }

  const CancleUpdate = () => {
    props.clearfunding().then(() => {
      props.history.push("/");
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfunding({ ...funding, [name]: value });
  };

  const handleSubmit = () => {
    const newdata = {
      project_type_id,
      coordinater_funding_project_name,
      coordinator_project,
      coordinater_funding_agency,
      project_leader,
      coordinater_funding_phone,
      coordinator_fundingagency_status_id,
      coordinater_funding_year,
      coordinater_funding_budget,
      coordinater_funding_name,
      budget_id,
      coordinator_univercity_budget,
    };

    props.updatefunding(id, newdata).then(() => {
      props.clearfunding();
      // props.history.push("/");
    });
    console.log("testUpdate2");
  };

  return (
    <React.Fragment>
      <div className="card-header">
        <div
          className="projcard-bar"
          style={{ marginLeft: "0", marginRight: "0" }}
        ></div>
      </div>

      <form>
        <h4 style={{ textAlign: "center" }}>เพิ่มข้อมูลแหล่งทุน งานวิจัย</h4>

        <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
        <div className="card-body card-body-pading">
          <Row>
            {/* ประเภทแหล่งทุน */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>ประเภท</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setproject_type_id(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกประเภท</option>
                  ) : (
                    <option defaultValue={props.funding.project_type}>
                      {props.funding.project_type_name}
                    </option>
                  )}
                  {props.project_type.length > 0 ? (
                    <>
                      {props.project_type.map((value, i) => {
                        return (
                          <option key={i} value={value.project_type_id}>
                            {value.project_type_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
              </div>
            </Col>
            {/* ชื่อโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <label>ชื่อโครงการ</label>
                <input
                  type="text"
                  className="form-control"
                  name="coordinater_funding_project_name"
                  value={props.funding.coordinater_funding_project_name}
                  onChange={(e) => setcoordinater_funding_name(e.target.value)}
                />
              </div>
            </Col>
            {/* ผู้ประสานงานโครงการ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>ผู้ประสานงานโครงการ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.coordinator_project}
                  onChange={(event) => {
                    setcoordinator_project(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* หน่วยงานรับผิดชอบ */}
            <Col lg={6}>
              <div className="form-group">
                <Form.Label>หน่วยงานรับผิดชอบ</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_agency}
                  required
                  onChange={(event) => {
                    setcoordinater_funding_agency(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* นักวิจัยผู้รับผิดสอบ */}
            <Col lg={8}>
              <div className="form-group">
                <Form.Label>นักวิจัยผู้รับผิดสอบ</Form.Label>
                <Select
                  // defaultValue={{ label: props.concept.leader_name }}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  onChange={(selectedOptions) => {
                    setproject_leader(selectedOptions);
                  }}
                  // defaultValue={[colourOptions[4], colourOptions[5]]}
                  options={researcher}
                ></Select>
              </div>
            </Col>
            {/* เบอร์ติดต่อ */}
            <Col lg={4}>
              <div className="form-group">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  type="phone"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_phone}
                  onChange={(event) => {
                    setcoordinater_funding_phone(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* สถานะโครงการ */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>สถานะโครงการ :</Form.Label>
                <div className="form-control" style={{ border: "none" }}>
                  {props.fundingstatus.length > 0 ? (
                    <>
                      {props.fundingstatus.map(function (data, i) {
                        return (
                          <Form.Check
                            key={i}
                            style={{ marginLeft: "2rem" }}
                            inline
                            required
                            defaultValue={
                              props.coordinator_fundingagency_status_id
                            }
                            label={data.coordinator_fundingagency_status_name}
                            name="coordinator_fundingagency_status_id"
                            value={data.coordinator_fundingagency_status_id}
                            type="radio"
                            onChange={(event) => {
                              setcoordinator_fundingagency_status_id(
                                event.target.value
                              );
                            }}
                          />
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
          <div className="projcard-bar" style={{ margin: "1.5rem 5rem" }}></div>
          <Row>
            {/* ปีงบประมาณ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ปีงบประมาณ</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setcoordinater_funding_year(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกปี</option>
                  ) : (
                    <option
                      defaultValue={props.funding.coordinater_funding_year}
                    >
                      {props.funding.coordinater_funding_year}
                    </option>
                  )}

                  {props.year.map((value, i) => {
                    return (
                      <option key={i} value={value.value}>
                        {value.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
            {/* งบประมาณที่ได้รับ */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>งบประมาณที่ได้รับ</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  defaultValue={props.funding.coordinater_funding_budget}
                  onChange={(event) => {
                    setcoordinater_funding_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* ชื่อแหล่งทุน */}
            <Col lg={7}>
              <div className="form-group">
                <Form.Label>ชื่อแหล่งทุน</Form.Label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    setcoordinater_funding_name(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกแหล่งทุน</option>
                  ) : (
                    <option defaultValue={props.funding.coordinator_source_id}>
                      {props.funding.source_funds_name}
                    </option>
                  )}

                  {props.source_funds.length > 0 ? (
                    <>
                      {props.source_funds.map((value, i) => {
                        return (
                          <option key={i} value={value.source_funds_id}>
                            {value.source_funds_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>

                <div>
                  <NavLink
                    to="/addfunding/aboutfunding"
                    style={{ color: "#000", fontSize: "14px" }}
                  >
                    <i
                      style={{ margin: "0.5rem", cursor: "pointer" }}
                      className="fas fa-plus-circle"
                      // onClick={() => setModalShow(true)}
                    >
                      {" "}
                      เพิ่มแหล่งทุน
                    </i>
                  </NavLink>
                </div>
              </div>
            </Col>
            {/* ประเภทงบประมาณ */}
            <Col lg={5}>
              <div className="form-group">
                <Form.Label>ประเภทงบประมาณ</Form.Label>
                <select
                  required
                  className="form-control"
                  onChange={(event) => {
                    setbudget_id(event.target.value);
                  }}
                >
                  {props.funding.length === 0 ? (
                    <option value="">เลือกประเภทงบประมาณ</option>
                  ) : (
                    <option defaultValue={props.funding.budget_id}>
                      {props.funding.coordinator_Budget_type_name}
                    </option>
                  )}

                  {props.budgettype.length > 0 ? (
                    <>
                      {props.budgettype.map((value, i) => {
                        return (
                          <option
                            key={i}
                            value={value.coordinator_Budget_type_id}
                          >
                            {value.coordinator_Budget_type_name}
                          </option>
                        );
                      })}
                    </>
                  ) : null}
                </select>
              </div>
            </Col>
            {/* รายได้เข้ามหาลัย */}
            <Col lg={12}>
              <div className="form-group">
                <Form.Label>รายได้เข้ามหาลัย</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  defaultValue={props.funding.coordinator_univercity_budget}
                  required
                  onChange={(event) => {
                    setcoordinator_univercity_budget(event.target.value);
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="card-footer"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          {props.funding.length === 0 ? (
            <Row>
              <Col>
                <div className="center">
                  <Button
                    onClick={handleSubmit}
                    className="btn bg-gradient-primary btn-md"
                  >
                    บันทึก
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row style={{ padding: "0 5rem" }}>
              <Col lg={6} style={{ float: "left" }}>
                <Button
                  onClick={CancleUpdate}
                  className="btn bg-gradient-primary btn-md"
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col lg={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={handleSubmit}
                  className="btn bg-gradient-primary btn-md"
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    researchfaculty: state.funding.researchfaculty,
    budgettype: state.funding.budgettype,
    fundingstatus: state.funding.fundingstatus,
    year: state.concept.year,
    concept: state.concept.concept,
    user: state.concept.user,
    source_funds: state.concept.sourcefund,
    project_type: state.concept.projecttype,
    funding: state.funding.getonefunding,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getSource_funds,
  getprojecttype,
  getyear,
  getresearch_faculty,
  getbudget_type,
  getonefunding,
  getfunding_status,
  insertfunding,
  updatefunding,
  clearfunding,
})(withRouter(EditFundingResearch));
