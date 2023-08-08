/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage

*/
import SharePoint from '../../assets/sharePoint_logo.png'

// DONOT CHANGE
export const KEY_NAME_PROFILE_SELECTED = 'profile_selected_v2';
export const KEY_NAME_CONTEXT_DATA = 'context_data_v2'


export const InitialData = [
  // {
  //   name: "Anonymous",
  //   profile: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
  //   context: [],
  // },
  {
    name: "Pascal Wehrlein",
    email : "pwehrlein@coveo.com",
    role: 'Motorsport Technician',
    department:'Motorsport',
    location:'Zuffenhausen, DE',
    years_of_service: '6',
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqaWGs8VvrTdoGoUHDlDaH8nIsbSIgcc_o5upZEhHblxLWbaPB_5GEY95Ah7JwuHfPI-wFag&s",
    people_worked_with:['Sarah Young', 'HR Specialist', 'HR', "https://www.famousbirthdays.com/faces/rafferty-sarah-image.jpg"],
    tasks: ["Complete training course", "Book in meeting with the team"],
    files:['Plan Benefits Open Enrollment', 'Documents', 'Dec 16 2022', SharePoint],
    context: [
      {
        active: true,
        keyName: "department",
        keyValue: "motorsport",
        customQRF: false,
      }
    ],
  },
  {
    name: "David Beckmann",
    email : "dbeckmann@coveo.com",
    role: 'Design Engineer',
    department:'Automotive Engineering',
    location:'Zuffenhausen, DE',
    years_of_service: '2',
    profile:
      "https://res.cloudinary.com/prod-f2f3/image/upload/v1665482230/f2/global/articles/2022/10_October/GettyImages-1421965401.jpg",
    people_worked_with:['Dule Hill', 'Director','Engineering', "https://vz.cnwimg.com/wp-content/uploads/2011/07/Dule-Hill-e1567471440831.jpg"],
    tasks: ["Meet with HR", "Meet with Antoine"],
    files:['Free Food and other Culinary Perks at Coveo', 'Documents','Nov 23 2021', SharePoint],
    context: [
      {
        active: true,
        keyName: "department",
        keyValue: "design",
        customQRF: false,
      }
    ],
  },
];



