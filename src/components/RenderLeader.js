import React from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderLeader(props) {

    const leaders = props.props.leaders.map((leader) => {
        return (
            <div key={leader.id} className="col-12 mt-5">

                <Media tag="li">
                    <Media left middle>
                        <Media object src={baseUrl + leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>{leader.name}</Media>
                        <p>Leader {leader.designation}</p>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </div>
        );
    });

    return (
        <>
            { leaders}
        </>
    )
}

export default RenderLeader;
