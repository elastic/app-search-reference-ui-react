import PropTypes from "prop-types";

export default PropTypes.shape({
  // A display name, like "Name"
  name: PropTypes.string,
  // A field name, like "name".
  value: PropTypes.string,
  // asc or desc
  direction: PropTypes.oneOf(["asc", "desc", ""])
});

export function create({ name, value, direction }) {
  return {
    name,
    value,
    direction
  };
}
