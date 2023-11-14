import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default function Forecast({ forecast }) {
    return (
        <div style={{ marginTop: 20 }}>
            <div className="forecast-main-header">
                6 Day Forecast (every 3 hours) 
            </div>
            <Card.Group itemsPerRow={4}>
                {forecast.map((data) => {
                    return (
                        <Card className="forecast-card">
                            <Card.Content>
                                <Card.Header className="forecast-date">
                                    Date: {moment.unix(data.dt).format('LLL')}
                                </Card.Header>
                                <Card.Header className="forecast-header">
                                Temperature: {Math.round((data.main.temp_max + data.main.temp_min) / 2)} ℃
                                </Card.Header>
                                <Card.Meta className="forecast-header">
                                    Humidity: {data.main.humidity} %
                                </Card.Meta>
                                <Card.Description className="temp-desc">
                                    Description: {data.weather[0].description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}