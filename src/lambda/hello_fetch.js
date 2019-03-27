import fetch from "node-fetch";

const API_ENDPOINT =
  "https://sonarcloud.io/api/measures/component?metricKeys=new_bugs,new_vulnerabilities,new_technical_debt,new_code_smells,new_coverage,coverage,new_duplicated_lines_density,new_duplicated_blocks&component=takuyahara_test-sonar-cloud";

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const newData = {};
      data.component.measures.forEach(obj => {
        newData[obj.metric] = obj.periods ? obj.periods[0].value : obj.value;
      });
      return {
        statusCode: 200,
        body: `${JSON.stringify(newData)}`
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
