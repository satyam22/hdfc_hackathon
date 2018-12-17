const { SERVER_PORT, HOST } = require('./config');

const API_BASE_URL = `http://${HOST}:${SERVER_PORT}/starlord.hackerearth.com/kickstarter`;

export const getAllProjects = async (callback) => {
  try {
    const response = await fetch(API_BASE_URL);
    const results = await response.json();
    if (results.length > 0){
      const updatedResults = results.map( result => {
        const { blurb, by, country, currency, location, state, title, type, url } = result;
        const resObj = {
          id: result["s.no"],
          amountPledged: result["amt.pledged"],
          endTime: result["end.time"],
          percentageFunded: result["percentage.funded"],
          numOfBackers: result["num.backers"],
          blurb,
          by,
          country,
          currency,
          location,
          state,
          title,
          type,
          url
        };
        return resObj;
      })
      callback({ success: true, results: updatedResults });
    }
    else
      callback({ success: false, message: "Error occured in fetching projects from server. try again !" });
  } catch (error) {
    callback({ success: false, message: error.message })
  }
}