import * as _ from 'lodash';
export function getHidden(entity, hiddenEntities) {
    let result = false;
    // Only allow nodes and edges to be hidden
    if ((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge'))
        return result;
    let matched = _.find(hiddenEntities, (value, index) => {
        return value == entity.id;
    });
    if (matched) {
        result = true;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGlkZGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby91dGlscy9nZXRIaWRkZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxvQkFBb0IsTUFBTSxFQUFFLGNBQWM7SUFDNUMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLDBDQUEwQztJQUMxQyxFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVqRixJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLO1FBQ3RELE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM5QixDQUFDLENBQVcsQ0FBQztJQUViLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDVixNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==