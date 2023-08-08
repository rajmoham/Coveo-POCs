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
    name: "Hugh Jackman",
    email : "hjackman@coveo.com",
    profile: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/21/17/Hugh-Jackman.jpg",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "electric",
        customQRF: false,
        disabled : true, 
      }
    ],
  },
  {
    name: "Jennifer Lawrence",
    email : "jlawrence@coveo.com",
    profile:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1357391978.jpg?crop=1xw:0.6666666666666666xh;center,top&resize=1200:*",
    context: [
      {
        active: true,
        keyName: "interest",
        keyValue: "energy",
        customQRF: false,
        disabled : true
      },
    ],
  },
];



