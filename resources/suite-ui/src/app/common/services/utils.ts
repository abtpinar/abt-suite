/**
 * Parses an entity object when returned from the server with nested child entities.
 * The server always returns entities in the form of:
 *
 * // parent
 * {
 *   prop: 'prop value',
 *   child: {
 *     data: ChildEntity
 *   }
 * }
 *
 * So what this method does is remove the intermediary 'data' prop to flatten the object
 * as follows:
 *
 * // parent
 * {
 *   prop: 'prop value',
 *   child: ChildEntity
 * }
 *
 * It works wether the property of the child entity refers to a single instance
 * or an array of ChildEntity
 *
 * @param entity Object to parse
 */
export function parseNestedEntities<T>(entity: Object) {
  const newObject = Object.keys(entity).reduce((acc, prop) => {
    if (entity[prop] instanceof Object) {
      if (Object.keys(entity[prop]).length === 1 && entity[prop].data) {
        if (entity[prop].data instanceof Array)
          acc[prop] = [...entity[prop].data];
        else acc[prop] = { ...entity[prop].data };
        return acc;
      }
    }
    acc[prop] = entity[prop];
    return acc;
  }, {});
  return newObject as T;
}
