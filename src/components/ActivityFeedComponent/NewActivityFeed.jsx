import React, {useEffect, useState} from 'react';
import "../../styles/index.css";

//Placeholder:3
import activities from "../ActivityData";


//To get the activities from the database, we have to get the username of the user that is currently
//logged in.




//Should be able to get activities from friends and your own.
//Your activities can be filtered to show only runs, weightlifting or
//combined activities.

const NewActivityFeed = () => {

    const [feedType, setFeedType]=useState("Mine (public)");
    const [feedSort, setFeedSort]=useState("All");

    const [visibleActivities, setVisibleActivities] = useState(3);

    const showMoreActivities = () => {
        setVisibleActivities((prev) => prev + 3);
    };

    return (
        <div className="activity-list-container">
            <h2 className="activity-list-header">Activity Feed</h2>
            <form>
                <div>
                    <label>Accessibility:</label>
                    <select
                        id="feedType"
                        name="feedType"
                        value={feedType}
                        onChange={(e) => setFeedType(e.target.value)}
                    >
                        <option value="All mine">All</option>
                        <option value="Mine (public)">Public</option>
                        <option value="Mine (private)">Private</option>
                    </select>
                </div>
                {(feedType!=="Friends Activities") ?
                    <div>
                        <label>Sort By:</label>
                        <select
                            id="feedSort"
                            name="feedSort"
                            value={feedSort}
                            onChange={(e) => setFeedSort(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Weightlifting">Weightlifting</option>
                            <option value="Running">Running</option>
                            <option value="Combined">Combined</option>
                        </select>
                    </div>: null}
            </form>
            <hr className="divider" />

            {activities.slice(0, visibleActivities).map((activity) => (
                <div key={activity.id} className="activity-item">
                    <h3>{activity.title}</h3>
                    <p><strong>Duration:</strong> {activity.duration} min</p>
                    <p><strong>Description:</strong> {activity.description}</p>
                    {(activity.distance !==null) ? <p><strong>Distance:</strong> {activity.distance} km</p>
                    : null}
                    {(activity.exercises !==null) ?
                        <div>
                            <p><strong>Exercises:</strong></p>
                        </div> : null}
                    <hr className="divider" />
                </div>
            ))}
            {visibleActivities < activities.length && (
                <button className="show-more-button" onClick={showMoreActivities}>
                    Show more
                </button>
            )}
        </div>

    );
}

export default NewActivityFeed;