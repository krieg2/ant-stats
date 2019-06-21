import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { initCalculation, startCalculation, endCalculation } from '../../actions.js';
import StatsPage from './StatsPage';

const mapStateToProps = state => {
    return {
        calculations: state
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ initCalculation, startCalculation, endCalculation }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);