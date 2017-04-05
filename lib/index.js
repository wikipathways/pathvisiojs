// IMPORTS
// Required libraries that are imported for side-effects. Polyfills and shims go here.
// TODO: Most of these polyfills are actually used by Kaavio. Be sure to include them when separating
import 'document-register-element';
import 'web-animations-js';
import 'whatwg-fetch';
// Import styles
// TODO: Use material design
// TODO: Use shadow DOM to encapsulate styles
// TODO: State in docs that Webpack/browserify will automatically bring styles in when bundling
import 'roboto-fontface/css/roboto/roboto-fontface.css';
// Import internal libraries for side-effects.
import './wrappers/pvjs.webcomponent'; // TODO: Check this registers the component in browsers
// Exports
import { Pvjs } from './wrappers/vanilla';
export default Pvjs; // Use default
export { Pvjs }; // and specific syntax
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLHNGQUFzRjtBQUN0RixxR0FBcUc7QUFDckcsT0FBTywyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sY0FBYyxDQUFDO0FBRXRCLGdCQUFnQjtBQUNoQiw0QkFBNEI7QUFDNUIsNkNBQTZDO0FBQzdDLCtGQUErRjtBQUMvRixPQUFPLGdEQUFnRCxDQUFDO0FBRXhELDhDQUE4QztBQUM5QyxPQUFPLDhCQUE4QixDQUFDLENBQUMsdURBQXVEO0FBRTlGLFVBQVU7QUFDVixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsZUFBZSxJQUFJLENBQUMsQ0FBQyxjQUFjO0FBQ25DLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLHNCQUFzQiJ9