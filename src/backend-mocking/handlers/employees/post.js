import {http, HttpResponse} from "msw"
// import fable from "@/a-library/helpers/content/fable.js"

export const createPostHandler = ({ baseUrl, dbInstance }) => {
  return http.post(`${baseUrl}/employees/`, async ({ request, params }) => {
     
    let body = await request.json()
    let positionForEmployee = dbInstance.position.findFirst({
      where: {
        id: {
          equals: body.position_id,
        },
      },
    });
    let createdEmployee = dbInstance.employee.create({
      firstname: body.firstname.toLowerCase(),
      lastname: body.lastname,
      position: positionForEmployee,
    });

    return HttpResponse.json({
      id:createdEmployee.id,
      firstname:createdEmployee.firstname,
      lastname:createdEmployee.lastname,
      position: {
        id: createdEmployee.position.id
      },
    })

  })
}
