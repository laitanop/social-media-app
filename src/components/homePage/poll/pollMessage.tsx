import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import styles from "../../../../styles/PollMessage.module.css";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { findIndex } from "lodash";
import moment from "moment";
import { Box } from "@mui/system";
import {
  isNegative,
  sumVotes,
  getPercentage,
  userVoted,
  getBackgroundColor,
  getWidth,
} from "./helper";

const PollMessage = ({ message }) => {
  const [poll, setPoll] = useState({ poll: message.poll });

  const duration = moment.duration(message.poll.pollLength);
  const pollEnd = moment(message.date).add(duration);

  const daysLeft = pollEnd.diff(moment(), "days", true);

  const onClickPoll = async (question) => {
    const currentUserUid = auth.currentUser.uid.toString();
    const updatedPoll = { ...poll };
    const pollToUpdate = updatedPoll.poll.list.find(
      (poll) => poll.id === question.id
    );
    pollToUpdate.voters = pollToUpdate.voters + 1;
    updatedPoll.poll.votersUsers.push(currentUserUid);
    setPoll(updatedPoll);

    let getCollection = collection(db, "message");
    let data = await getDocs(getCollection);
    const findIndexRef = findIndex(data.docs, (o) => o.id === message.id);
    const updatePollData = await updateDoc(data.docs[findIndexRef].ref, poll);
    return updatePollData;
  };

  const pollActive = (
    <React.Fragment>
      {message.poll.list.map((question) => (
        <React.Fragment key={question.id}>
          <Button
            fullWidth
            className={styles.pollButton}
            onClick={() => onClickPoll(question)}
          >
            {question.question}-- {question.voters}
          </Button>
        </React.Fragment>
      ))}
      {sumVotes(message.poll.list)} votes - {Math.trunc(daysLeft)} days left
    </React.Fragment>
  );

  const pollInactive = (
    <React.Fragment>
      {message.poll.list.map(({ id, voters, question }) => (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          key={id}
        >
          <Grid item xs={8}>
            <Box
              style={{
                backgroundColor: getBackgroundColor(message.poll.list, voters),
                width: getWidth(voters, message),
              }}
              className={styles.pollInactive}
            >
              {question}
            </Box>
          </Grid>
          <Grid item xs={2}>
            {getPercentage(voters, sumVotes(message.poll.list)).toFixed(0)}%
          </Grid>
        </Grid>
      ))}
      {sumVotes(message.poll.list)} votes -{" "}
      {isNegative(daysLeft)
        ? "Final results"
        : Math.trunc(daysLeft) + " days left"}
    </React.Fragment>
  );

  const showPollList =
    isNegative(daysLeft) || userVoted(message, auth.currentUser.uid)
      ? pollInactive
      : pollActive;

  return <React.Fragment>{showPollList}</React.Fragment>;
};

export default PollMessage;
