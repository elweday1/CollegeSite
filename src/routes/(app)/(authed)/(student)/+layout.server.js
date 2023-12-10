/**
 * Loads data from the API.
 *
 * @param {object} loadEvent - The load event object containing the fetch and event properties.
 * @return {object} An object containing the loaded data from the API.
 */
export async function load ({fetch, cookies}) {
  const studentId = cookies.get("SESSION_STUDENT");
  const responses = await Promise.all([
    fetch("/api/sessions"),
    fetch("/api/students"),
    fetch("/api/grades"),
    fetch("/api/notifications/" + studentId),
    fetch("/api/students/" + studentId)
  ]);

  const [sessionsResponse, studentsResponse, gradesResponse, notificationsResponse, studentResponse] = responses;

  const sessionData = await sessionsResponse.json();
  const histData = await studentsResponse.json();
  const boxData = await gradesResponse.json();
  const notificationsData = await notificationsResponse.json();
  const studentData = await studentResponse.json();

  return new Promise((resolve, reject)=>{
    resolve({ notificationsData, sessionData, histData, boxData, studentData, studentId })
  });
};
