import React from 'react';
import { CourseInfo } from '../../Interfaces';

interface Props {
    listing: CourseInfo['listing'];
}

const renderQuarter = (quarter: string, professors: Array<string>) => {
    return (
        <div className={`column quarterbox half`}>
            <div className="message-header">
                <p>{quarter}</p>
            </div>
            <div className={`message-body quartercontent`}>
                {professors.map((prof) => (<div className="professor-listing">{prof}</div>))}
            </div>
        </div>
    );
}

const Listing : React.FC<Props> = (props: Props) => {
    const { listing } = props;
    return (
        <div className={`listing-row columns`}>
            {
                (listing.Fall) && renderQuarter("Fall", listing.Fall)
            }

            {
                (listing.Winter) && renderQuarter("Winter", listing.Winter)
            }

            {
                (listing.Spring) && renderQuarter("Winter", listing.Spring)
            }
        </div>
    );
}

export default Listing;