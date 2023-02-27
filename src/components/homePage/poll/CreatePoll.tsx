import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Fab } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MuiSelect from '../../common/MuiSelect';
import { last } from 'lodash';
import styles from '../../../../styles/CreatePoll.module.css';

type Props = {
    removePoll: () => void;
    handlePoll: (poll) => void;
};

const PollPage = ({ removePoll, handlePoll }: Props) => {
    const [poll, setPoll] = useState({
        list: [
            { id: 1, question: '', voters: 0 },
            { id: 2, question: '', voters: 0 },
        ],
        pollLength: { days: 1, hours: 0, minutes: 0 },
    });

    const handleAddInput = () => {
        const nextInput = poll.list;
        const questionId = nextInput.length + 1;
        const newList = [
            ...nextInput,
            { id: questionId, question: '', voters: 0 },
        ];

        setPoll({
            ...poll,
            list: newList,
        });
    };
    const handleChangeText = (value, name) => {
        poll.list[name - 1].question = value;
    };
    const showAddButton = poll.list.length < 4;

    const getRange = (range: number) => {
        let i = [0];

        while (i.length <= range) {
            i.push(last(i) + 1);
        }

        return i;
    };

    const handleChange = (event) => {
        setPoll({
            ...poll,
            pollLength: {
                ...poll.pollLength,
                [event.target.name]: event.target.value,
            },
        });
    };

    useEffect(() => {
        handlePoll(poll);
    }, [poll]);
    const getPoll = () => {
        const poll = localStorage.getItem('poll');
        if (poll) {
            setPoll(JSON.parse(poll));
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={styles.pollContainer}>
                <Box className={styles.pollBox}>
                    <Grid container spacing={2} className={styles.pollBoxGrid}>
                        <Grid item md={showAddButton ? 11 : 12}>
                            {poll.list.map((question) => (
                                <TextField
                                    className={styles.pollTextField}
                                    key={question.id}
                                    onChange={(e) =>
                                        handleChangeText(
                                            e.target.value,
                                            question.id.toString()
                                        )
                                    }
                                    fullWidth
                                    id="outlined-basic"
                                    label={`Choice ${question.id}`}
                                    variant="outlined"
                                />
                            ))}
                        </Grid>
                        {showAddButton && (
                            <Grid
                                item
                                xs={6}
                                md={1}
                                alignItems="flex-end"
                                container
                            >
                                <Fab
                                    size="small"
                                    onClick={() => handleAddInput()}
                                    className={styles.pollAddButton}
                                >
                                    <AddOutlinedIcon />
                                </Fab>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <div className={styles.pollLength}>
                    {' '}
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={styles.pollLabel}>
                            Poll length
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MuiSelect
                                name="days"
                                label="Days"
                                items={getRange(7)}
                                handleChange={handleChange}
                                value={poll.pollLength.days}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MuiSelect
                                name="hours"
                                label="Hours"
                                items={getRange(24)}
                                handleChange={handleChange}
                                value={poll.pollLength.hours}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MuiSelect
                                name="minutes"
                                label="Minutes"
                                items={getRange(59)}
                                handleChange={handleChange}
                                value={poll.pollLength.minutes}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={styles.buttonBoxRemovePoll}>
                    <Button onClick={removePoll}>Remove poll</Button>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default PollPage;
