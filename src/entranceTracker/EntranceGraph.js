import React from 'react';
import { Graph } from 'react-d3-graph';

class EntranceGraph extends React.Component {
    render() {
        // graph payload (with minimalist structure)
        const data = {
            nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
            links: [
                { source: 'Harry', target: 'Sally' },
                { source: 'Harry', target: 'Alice' },
            ],
        };

        // the graph configuration, just override the ones you need
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: 'lightgreen',
                size: 120,
                highlightStrokeColor: 'blue',
            },
            link: {
                highlightColor: 'lightblue',
            },
        };

        const onClickNode = (nodeId) => {
            window.alert(`Clicked node ${nodeId}`);
        };

        const onClickLink = (source, target) => {
            window.alert(`Clicked link between ${source} and ${target}`);
        };
        return (
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />
        );
    }
}

export default EntranceGraph;
