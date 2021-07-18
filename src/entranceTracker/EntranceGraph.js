import React from 'react';
import { Graph } from 'react-d3-graph';
import './EntranceGraph.css';

class EntranceGraph extends React.Component {
    static createNode(label) {
        return {
            id: label,
        };
    }

    render() {
        // graph payload (with minimalist structure)
        const data = {
            nodes: [
                EntranceGraph.createNode('Sealed Grounds Spiral'),
                EntranceGraph.createNode('Behind the Temple'),
                EntranceGraph.createNode('Faron Woods'),
                EntranceGraph.createNode('Inside the Great Tree'),
                EntranceGraph.createNode('Deep Woods'),
                EntranceGraph.createNode('Lake Floria'),
                EntranceGraph.createNode('Dragon\'s Lair'),
                EntranceGraph.createNode('Floria Waterfall'),
            ],
            links: [
                { source: 'Behind the Temple', target: 'Deep Woods', label: 'Faron Woods <-> Faron Woods' },
                { source: 'Inside the Great Tree', target: 'Faron Woods', label: 'Faron Woods <-> Faron Woods' },
                { source: 'Faron Woods', target: 'Lake Floria', label: 'Faron Woods <-> Faron Woods' },
                { source: 'Behind the Temple', target: 'Deep Woods', label: 'Faron Woods <-> Faron Woods' },
                { source: 'Behind the Temple', target: 'Deep Woods', label: 'Faron Woods <-> Faron Woods' },
            ],
        };

        // the graph configuration, just override the ones you need
        const myConfig = {
            automaticRearrangeAfterDropNode: false,
            collapsible: false,
            directed: false,
            focusAnimationDuration: 0.75,
            focusZoom: 1,
            freezeAllDragEvents: false,
            height: 400,
            highlightDegree: 1,
            highlightOpacity: 1,
            linkHighlightBehavior: false,
            maxZoom: 8,
            minZoom: 0.1,
            initialZoom: null,
            nodeHighlightBehavior: false,
            panAndZoom: false,
            staticGraph: false,
            staticGraphWithDragAndDrop: false,
            bounded: false,
            width: 800,
            d3: {
                alphaTarget: 0.05,
                gravity: -100,
                linkLength: 200,
                linkStrength: 1,
                disableLinkForce: false,
            },
            node: {
                color: '#FFFFFF',
                fontColor: 'black',
                fontSize: 8,
                fontWeight: 'normal',
                highlightColor: '#0F0F0F',
                highlightFontSize: 8,
                highlightFontWeight: 'normal',
                highlightStrokeColor: 'SAME',
                highlightStrokeWidth: 'SAME',
                labelProperty: 'id',
                labelPosition: 'center',
                labelClass: '',
                mouseCursor: 'pointer',
                opacity: 1,
                renderLabel: true,
                size: 5000,
                strokeColor: '#000000',
                strokeWidth: 0.5,
                svg: '',
                symbolType: 'circle',
                viewGenerator: null,
            },
            link: {
                color: '#d3d3d3',
                fontColor: 'black',
                fontSize: 8,
                fontWeight: 'normal',
                highlightColor: 'SAME',
                highlightFontSize: 8,
                highlightFontWeight: 'normal',
                labelProperty: 'label',
                mouseCursor: 'pointer',
                opacity: 1,
                renderLabel: true,
                semanticStrokeWidth: false,
                strokeWidth: 1.5,
                markerHeight: 6,
                markerWidth: 6,
                type: 'STRAIGHT',
                selfLinkDirection: 'TOP_RIGHT',
                strokeDasharray: 0,
                strokeDashoffset: 0,
                strokeLinecap: 'butt',
            },
        };

        const onClickNode = (nodeId) => {
            window.alert(`Clicked node ${nodeId}`);
        };

        const onClickLink = (source, target) => {
            window.alert(`Clicked link between ${source} and ${target}`);
        };

        const onNodePositionChange = (nodeId, x, y) => {
            window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
        };

        return (
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
                onNodePositionChange={onNodePositionChange}
            />
        );
    }
}

export default EntranceGraph;
