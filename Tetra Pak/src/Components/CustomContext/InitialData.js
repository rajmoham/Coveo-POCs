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
    name: "Laurence Mott",
    email : "lmott@coveo.com",
    profile: "https://www.3blmedia.com/sites/default/files/styles/carousel_2x/public/images/laurence-mott2.jpg",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "recycling",
        customQRF: false,
        disabled : true, 
      }
    ],
  },
  {
    name: "Adolfo Orive",
    email : "aorive@coveo.com",
    profile:
      "https://www.tetralaval.com/content/dam/tetra-laval/tetra-laval/images/Adolfo_Orive_2023.jpg",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "automation",
        customQRF: false,
        disabled : true
      },
    ],
  },
];



