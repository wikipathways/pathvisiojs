// NOTE: mock-server must be started before running this.

import { values } from 'lodash';
import { pvjs } from '../../src/wrappers/vanilla';

import * as WikiPathwaysDefaultDisplayStyle from '../../src/WikiPathways.style';

//const customStyle = `
//	.background {
//		fill: white;
//	}
//	
//	.shadow {
//		filter: drop-shadow( 2px 2px 2px #000 ); /* Same syntax as box-shadow */
//		-webkit-filter: drop-shadow( 2px 2px 2px #000 );
//	}
//
//	text {
//		font-size: 14px;
//		pointer-events: none;
//		font-family: Arial, Helvetica, sans-serif;
//	}
//	
//	.InfoBox {
//		fill: #444;
//	}
//	
//	.citation {
//		fill: gray;
//		font-size: 10px;
//	}
//
//	.InfoBox .citation {
//		font-size: 0px;
//	}        
//	
//	.CellularComponent {
//		stroke: #808080;
//		stroke-width:3;
//		fill: #fff;          
//	}
//	
//	.Cell {
//		stroke: #808080;
//		stroke-width:3;
//		fill: #fff;
//	}
//	
//	
//	.DataNode .shapeType {
//		clip-path: url(#rounded-rectangle);
//		fill: #518569;
//	}
//	
//	.DataNode .textlabel {
//		fill: #fff;
//	}
//	
//	.Rna .shapeType {
//	fill: #9453A7;
//	}
//	
//	.Metabolite .shapeType {
//		fill: #0059b3;
//		clip-path: none;
//	}
//	
//	.Pathway .shapeType {
//	fill: white;
//	clip-path: none;
//	}
//	
//	.Pathway .textlabel {
//		fill: #75C95C;
//	}
//	
//
//	.Group-Complex {
//		fill: #B4B464;
//		fill-opacity: 0.1;
//		stroke: #808080;
//	}
//	
//	.Group-None {
//		fill: #B4B464;
//		fill-opacity: 0.1;
//		stroke: #808080;
//	}
//	
//	.Group-Pathway {
//		fill: #008000;
//		fill-opacity: 0.05;
//		stroke: #808080;
//	}
//	
//
//	.Interaction {
//		stroke: #000000;
//	}
//	
//	.Inhibition {
//		stroke: red;
//		stroke-width: 1.3;
//	}
//`;

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url?) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// React says not to render directly into document.body, so here's a container.
var container = document.createElement('div');
const containerId = 'pvjs-container-' + new Date().toISOString().replace(/\W/g, '');
container.setAttribute('id', containerId);
container.setAttribute('width', '100%');
container.setAttribute('height', '1000px');
document.body.appendChild(container)

const pathwayId = getParameterByName('id') || 'WP4';
pvjs('#' + containerId, 'http://identifiers.org/wikipathways/' + pathwayId, {
	customStyle: WikiPathwaysDefaultDisplayStyle,
	src: 'http://localhost:4522/pathways/playground',
});
