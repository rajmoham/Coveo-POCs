/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage


* The 'disabled' property make the context uneditable on the frontend
*/


// DONOT CHANGE
export const KEY_NAME_PROFILE_SELECTED = 'profile_selected_v2';
export const KEY_NAME_CONTEXT_DATA = 'context_data_v2'


export const InitialData = [
  {
    name: "Anonymous",
    profile: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
    context: [],
  },
  {
    name: "Michael Sen",
    email : "msen@coveo.com",
    profile: "https://pbs.twimg.com/profile_images/1178937230502572032/1O6eeX49_400x400.jpg",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "dialysis",
        customQRF: false,
        disabled : true, 
      }
    ],
  },
  {
    name: "Wolfgang Kirsch",
    email : "wkirsch@coveo.com",
    profile:
      "https://media1.faz.net/ppmedia/aktuell/1463744804/1.7000655/default-retina/tritt-in-grosse-fussstapfen.jpg",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "therapy",
        customQRF: false,
        disabled : true
      },
    ],
  },
];



