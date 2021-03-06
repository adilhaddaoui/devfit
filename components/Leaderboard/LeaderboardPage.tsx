import React, { Fragment, useState, useEffect } from 'react';
import { Container, Loader, Feed, Button, Segment } from 'semantic-ui-react';
import { useRouter, Router } from 'next/router';
import { useAuthenticated } from '../useAuthenticated';

export type UserPoints = {
    id: string;
    username: string;
    points: number;
};

type LeaderboardPageProps = {
    data: UserPoints[];
};

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ data }) => {
    const [leaderboardItemsData, setLeaderboardItemsData] = useState<UserPoints[] | undefined>(undefined);

    const { isAuthenticated } = useAuthenticated();
    const router = useRouter();

    useEffect(() => {
        setLeaderboardItemsData(data);
    }, [data]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Global Leaderboard</h1>

            {isAuthenticated ? (
                <Button onClick={() => router.push('/feed')} fluid primary>
                    Complete Your Next Challenge
                </Button>
            ) : (
                <Button onClick={() => router.push('/register')} fluid primary>
                    Get Started
                </Button>
            )}

            {!leaderboardItemsData && (
                <div>
                    <Loader active inline="centered" />
                </div>
            )}

            {leaderboardItemsData && (
                <Segment>
                    <Feed size="large">
                        {leaderboardItemsData.map((item, index) => {
                            return (
                                <Fragment key={`leaderboardItem${index}`}>
                                    <LeaderboardItemComp leaderboardItem={item} />
                                </Fragment>
                            );
                        })}
                        
                        {leaderboardItemsData.length < 1 &&
                            <p style={{textAlign:'center'}}>No ranks to show.</p>
                        }
                    </Feed>
                </Segment>
            )}
        </div>
    );
};

type LeaderboardItemProps = {
    leaderboardItem: UserPoints;
};

const LeaderboardItemComp: React.FC<LeaderboardItemProps> = ({ leaderboardItem }) => {
    const { username, points } = leaderboardItem;

    const router = useRouter();

    return (
        <Feed.Event>
            <Feed.Label icon="user secret" style={{ display: 'flex', alignItems: 'center' }} />
            <Feed.Content>
                <Feed.Summary>
                    {username}
                    <Feed.Date>{points} Points</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.User onClick={() => router.push(`/profile/${username}`)}>Visit Profile</Feed.User>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    );
};
