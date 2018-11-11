import React from 'react';
import { Button } from 'antd';

const PREFIX_URL = 'https://www.kickstarter.com';

const Project = (props) => {
  // const { params } = props.match
  const { match, projects } = props;
  let projectId = 0;
  if (match && match.match && match.match.params && match.match.params.id)
    projectId = match.match.params.id;
  // console.log(projectId);
  // console.log(projects);
  let project = projects.filter((project) => Number(project.id) === Number(projectId));
  if (Array.isArray(project) && project.length === 1)
    project = project[0];
  else return <h1>Project with specified ID does not exist </h1>;
  const { amountPledged, endTime, percentageFunded, numOfBackers, blurb, by, country, currency,
    title} = project;
  let { url } = project;
  url = `${PREFIX_URL}${url}`;
  return (
    <div className = "project">
      <div className = "title">{title}</div>
      <div className = "blurb">{blurb}</div>
      <div className = "author"> By : {by}</div>
      <div className = "country">Country: {country}</div>
      <div className = "currency">Currency: {currency}</div>
      <div className = "amount-pledged">Amount Pledged: {amountPledged}</div>
      <div className = "per-funded">Percentage Funded: {percentageFunded}</div>
      <div className = "backers">Total number of backers: {numOfBackers}</div>
      <div className = "end-time">Project end time: {endTime}</div>
      <div className = "url"><Button href={url}>Click here to know more</Button></div>
      </div>
      )
  }
  
export default Project;