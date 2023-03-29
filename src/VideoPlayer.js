import React, { useState } from "react";
import { nextVideo } from "./features/slices/videoSlice";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowRight } from "react-icons/bs";

const allVideos = [
  {
    id: 0,
    opt: "A",
    button_name: "Campaign structure",
    link: "https://media.videoask.com/transcoded/435ae671-33f0-45a4-b958-62402c2b6133/video.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWRpYV9pZCI6IjQzNWFlNjcxLTMzZjAtNDVhNC1iOTU4LTYyNDAyYzJiNjEzMyIsImV4cCI6MTY4MDE1NTQxMH0.UacplEEh8JkaX9ZDlx7keXU5bzzfU1l92xlXZdzGRKBcUA6OCH05K-Ycijnv0Mu-xca26ToENmnTgONDL13UyN5mFyErkXt3qhW1FuQOmbsf-yUcbaFbXtahU7vgPuY3KcbyhMYb-HOOm56vjSsskiSJkoP8KLQSPENkpIexMk2l73DLxaGsyfKwpB6Y7HyxWDGU2q0fKJCp-qlE2fdY9Z0mti5yR6r0W30YmKCLrMmuJLe5AFAxQyJ8YfGNWqCccFiogkRyaMa0aXJoEN9QIOhb_ZtcV1HtTQXcliQvrw1m6oSPuhfP62dToqc9pteqssaB6kS6Ltdc_84XPKCygKgNPEluyEMZPT5ICvSAJ0mHdwKKuoOC92AzMhBq1g-LGbwp2zHGXR8Tjclt9YTTu8MjHeeLy0wpfGxvAw-YxzXIYmOQ5OZmFnDrfAXdgt6ulD1031PnI6vsaEbqkqZ-64PAEa8ynbxu1C6Ccgn0yfB1UNXclpzBqu-EGPwLsTKTk5aDJyr8LrXBSNZ4J0aAYmOXvmALWPqfeFlvG3mU52pNupItlxVh3VSxaqt5lWKxceHMUspxcJAWfQd5oC3EpM910yLGdBdCWJ5NmoinYN5wcTdNuEl23aEqymoOwIRXKYrZtnBkt7PzTAG7dcCT_rDnSWYr4GYdjWNuiBoG5-E",
  },
  {
    id: 1,
    opt: "B",
    button_name: "Learn Facebook basics",
    link: "https://media.videoask.com/transcoded/e8762b7e-7699-495d-a72c-24ea32902eea/video.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWRpYV9pZCI6ImU4NzYyYjdlLTc2OTktNDk1ZC1hNzJjLTI0ZWEzMjkwMmVlYSIsImV4cCI6MTY4MDE1NTQxMH0.wR4UuRG9E_9J-tSNXKVqrCeNCENQCfMTkmAI5znzGdta4jYlHPshYyG3X0XQ7nDJpEJCLJYEqs3Z0r5mqzIyDZ496oEXzVvxU-9RJplCpe3TNeedjdVyVrySIW3NAhCTew5LPOJy4cYdtCkvblTiJ68OcWPhIArCj9wltETqqai9NwHydT-mAnOuvNjHoMVTQqOzksH-7j_lmTK9E5hrZCILqXw1Fl960pXMqptvx5hDyyGSJpiI8FgWm0UXnoP8WHFGyMmLOkjUPYeUJtHELcu9g5Jd9X4PrLUwhFQfMZr-dm4ZEjbuLGYkAi7jyEA08fxAvj-T_k_wCFeLVgxO-ZliHpBFkgDKSpxHR05PI7e3BX5qVE3fED6cyJW2dh7sKhlbXtntQok7XeZ_yq1m7hDoDOELDS9QlhTHR1oEOErgjBs8yNkVFoj1v_NXZYgZ64G0ay3xz6yRuif5Cp6WyUBppLCZwVrCdYeEe1l4QfmUepywbpDvQqNnl_wAsaQFiL9nzSCuL4yvNKbFsX8BVjTHFGY6-77bym2qxTb9anUh9nMvnnLHP1CFutEPAF-H_M7nTnzkZ0d5Hdu4rMr_Lzve3Hh7lH3hp46M4jk86b7FtNyIASA7URZZhdml0v-0I0lB9EYjLLGpeAqGKKEL2oDa0-TMA8L50Q3aVko_2dc",
  },
  {
    id: 2,
    opt: "C",
    button_name: "3rd choice",
    link: "https://media.videoask.com/transcoded/dabd0292-cf99-40ba-a12a-245a279b31dc/video.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWRpYV9pZCI6ImRhYmQwMjkyLWNmOTktNDBiYS1hMTJhLTI0NWEyNzliMzFkYyIsImV4cCI6MTY4MDExMzA3MH0.kPOwxYgw5jZ5QcdwOxlfCFfYg-JQmFzpMwo3b52Ah3614UzhOlrlYSfRI2WXPZqUeI2lb8NUUlJXXaUJ_9rhpzyz8JHWn7t61d-bQF-wIxfl3M0TyAtrK1mzSgMYp-boZwjSOSXFUhFySItKPIOu2EqZtux5T1FlXSbheHgcnukcVCpgtzemqOj1L9UppzrK2WULISvuZnbKCk3mEKkmMD41d3qUxGbc9ZAAo79FQylFHe04UDTUaaGZHN2n1j5dNJia8MVfTaY4FFTqLPe3CJKfcCGPY5fuag348Q3iVOaA3xxlihGQAQ8rYFErSVsdp-eixebLv7oqV6XluGQF0qxa-NDASfEsvvDRnstr_mqgnd3Rro90GLMxnrIXHZ76IYx0ACb0it3LOdj1WL2-mX20IjnyNmgnRlQnbwRWp__rBb6V6r6WDf6n0KL8xrOpsOkEhRws3zBJwkSxg6o092rfbCMQEXXT9EcOKYBhlmelMLMimTdtuaNGhB9EArMYhpkZCrILRIcC32_GKPIN1Ja-_t0to5_RDNda8vtHIcB-PmNUUUAgkEAcvVS1AdH2uepdXmSoqnN9L30k9KFuQ9oIs7nBHkxNuPiF1_-kc419Bc92tNFxXoeWh4xRu0t66hMJpyWa_nrL3ihw0q2vMy7FZsA15Wqh8UG7t8ZoK6M",
  },
];

const VideoPlayer = () => {
  const videoIndex = useSelector((state) => state.video.url);
  const dispatch = useDispatch();
  const [optButton, setOptButton] = useState(true);
  const [formButton, setFormButton] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleClick = (link) => {
    dispatch(nextVideo(link));
    setOptButton(false);
    setFormButton(true);
  };

  const handleOpenForm = () => {
    setFormButton(false);
    setOpenForm(true);
  };

  return (
    <div className="relative lg:static w-full h-screen lg:flex lg:items-center ">
      <div className=" w-full h-screen lg:w-1/2 ">
        <video
          className="w-full h-screen"
          src={videoIndex}
          id="my-video"
          autoPlay={!optButton}
          controls
        ></video>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2  lg:static lg:w-1/2 lg:translate-x-0">
        <div className=" space-y-4  lg:flex flex-col items-center justify-center ">
          {optButton &&
            allVideos.map(({ id, opt, button_name, link }) => (
              <button
                key={id}
                onClick={() => handleClick(link)}
                className="border-2 hover:border-2 hover:border-blue-600  flex items-center w-80 lg:w-96  lg:bg-gray-200 px-6 py-3 rounded-full bg-black bg-opacity-40"
              >
                <span className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-medium">
                  {opt}
                </span>
                <p className="px-4 font-medium text-xl text-white lg:text-black ">
                  {button_name}
                </p>
              </button>
            ))}

          {formButton && (
            <button
              onClick={handleOpenForm}
              className="flex items-center w-64 px-2 bg-blue-600 py-3 rounded-lg hover:scale-110 duration-200"
            >
              <span className="w-full  flex items-center justify-center text-white font-medium">
                Download "Compaign structure guide"
              </span>
            </button>
          )}
        </div>
      </div>

      {openForm && (
        <div className="absolute top-0 bottom-0 lg:static lg:w-full lg:translate-x-0 ">
          <form>
            <div className=" px-20 py-4 h-screen w-full flex flex-col justify-center space-y-4 bg-white ">
              <p className="text-xl font-medium">
                Before you go, please leave your contact details so we can get
                back to you...
              </p>
              <input
                className="border-b border-gray-500 outline-none py-2"
                type="text"
                placeholder="*Your name"
              />
              <input
                className="border-b border-gray-500 outline-none py-2"
                type="email"
                placeholder="*Your email"
              />
              <div className="flex items-start">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="terms"
                  value="policy"
                />
                <p className="ml-2 text-gray-500 text-sm">
                  * [Sample legal text] The personal data you have provided will
                  be processed by XXXXX for purposes of providing you the
                  service. The legal basis of the processing is XXXXX. Your data
                  will not be transferred nor assigned to third parties. You can
                  exercise your right to access, rectify and delete your data,
                  as well as the other rights granted by law by sending an email
                  to XXXXX. For further information, please check our privacy
                  policy XXXXX.
                </p>
              </div>
              <button className="w-full flex items-center px-2 bg-blue-600 py-4 rounded-lg ">
                <span className="w-full  flex items-center justify-center text-white font-medium">
                  Send your answer
                  <BsArrowRight className="font-bold ml-2" />
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
