import PropTypes from "prop-types";

export default PropTypes.arrayOf(
  PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    type: PropTypes.string.isRequired
  })
);
