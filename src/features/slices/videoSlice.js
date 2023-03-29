import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    url: "https://media.videoask.com/transcoded/dabd0292-cf99-40ba-a12a-245a279b31dc/video.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWRpYV9pZCI6ImRhYmQwMjkyLWNmOTktNDBiYS1hMTJhLTI0NWEyNzliMzFkYyIsImV4cCI6MTY4MDExMzA3MH0.kPOwxYgw5jZ5QcdwOxlfCFfYg-JQmFzpMwo3b52Ah3614UzhOlrlYSfRI2WXPZqUeI2lb8NUUlJXXaUJ_9rhpzyz8JHWn7t61d-bQF-wIxfl3M0TyAtrK1mzSgMYp-boZwjSOSXFUhFySItKPIOu2EqZtux5T1FlXSbheHgcnukcVCpgtzemqOj1L9UppzrK2WULISvuZnbKCk3mEKkmMD41d3qUxGbc9ZAAo79FQylFHe04UDTUaaGZHN2n1j5dNJia8MVfTaY4FFTqLPe3CJKfcCGPY5fuag348Q3iVOaA3xxlihGQAQ8rYFErSVsdp-eixebLv7oqV6XluGQF0qxa-NDASfEsvvDRnstr_mqgnd3Rro90GLMxnrIXHZ76IYx0ACb0it3LOdj1WL2-mX20IjnyNmgnRlQnbwRWp__rBb6V6r6WDf6n0KL8xrOpsOkEhRws3zBJwkSxg6o092rfbCMQEXXT9EcOKYBhlmelMLMimTdtuaNGhB9EArMYhpkZCrILRIcC32_GKPIN1Ja-_t0to5_RDNda8vtHIcB-PmNUUUAgkEAcvVS1AdH2uepdXmSoqnN9L30k9KFuQ9oIs7nBHkxNuPiF1_-kc419Bc92tNFxXoeWh4xRu0t66hMJpyWa_nrL3ihw0q2vMy7FZsA15Wqh8UG7t8ZoK6M",
  },
  reducers: {
    nextVideo(state, action) {
      state.url = action.payload;
    },
  },
});

export const { nextVideo } = videoSlice.actions;
export default videoSlice.reducer;
