import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Chart = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const fetchDocs = async () => {
      let url = "https://marketune-visualization-test.herokuapp.com/getData";
      const response = await axios.get(url);
      setDocs(response.data);
    };
    fetchDocs();
  }, []);
  console.log(docs);
  let goalTypes = [
    "share",
    "click",
    "referrer",
    "referred",
    "review",
    "twitter",
    "facebook",
    "giftshare",
  ];
  let sharePoints = 0,
    clickPoints = 0,
    referrerPoints = 0,
    referredPoints = 0,
    reviewPoints = 0,
    twitterPoints = 0,
    facebookPoints = 0,
    giftsharePoints = 0;
  docs.map((doc) => {
    if (doc.goal) {
      let goalType = doc.goal.goal_type;
      switch (goalType) {
        case "share":
          sharePoints += doc.goal.points_in;
          break;
        case "click":
          clickPoints += doc.goal.points_in;
          break;
        case "referrer":
          referrerPoints += doc.goal.points_in;

          break;
        case "referred":
          referredPoints += doc.goal.points_in;

          break;
        case "review":
          reviewPoints += doc.goal.points_in;

          break;
        case "twitter":
          twitterPoints += doc.goal.points_in;

          break;
        case "facebook":
          facebookPoints += doc.goal.points_in;

          break;
        case "giftshare":
          giftsharePoints += doc.goal.points_in;

          break;
        default:
          break;
      }
    }
  });
  console.log(sharePoints);
  const data = {
    labels: goalTypes,
    datasets: [
      {
        label: "Points In",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [sharePoints,clickPoints,referrerPoints,referredPoints,reviewPoints,twitterPoints,facebookPoints,giftsharePoints],
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        width={60}
        height={300}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Chart;

// {goal: {…}, userid: "401", corpid: "5f945a0f82a9f10024d380e2", status: "complete", createdAt: "2021-03-06T12:01:34.430Z"}
// corpid: "5f945a0f82a9f10024d380e2"
// createdAt: "2021-03-06T12:01:34.430Z"
// goal:
// goal_type: "click"
// points_in: 2
// points_out: 4
// __proto__: Object
// status: "complete"
// userid: "401"
// __proto__: Object
