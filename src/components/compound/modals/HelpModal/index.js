import React from "react";
import PropTypes from 'prop-types';
import Modal from '../../../basic/modal';

export default class ModalHelp extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        title:PropTypes.string,
        target:PropTypes.string,
        display:PropTypes.display,
    };

    /** React PropType Defaults **/
    static defaultProps = {
        title:'',
        target:'',
        display:false,
    };

    render() {
        return <Modal icon='fas fa-question-circle' title={this.props.title} target={this.props.target} display={this.props.display} closable>
            <div className='ort-content'>
                <h2>{_('help-broadcast-header')}</h2>
                <p>{_('help-broadcast-line-1')}</p>
            </div>
            <div className='ort-content'>
                <h2>{_('help-timer-header')}</h2>
                <p>{_('help-timer-line-1')}</p>
                <p>{_('help-timer-line-2')}</p>
                <ul>
                    <li>{_('help-timer-line-3')}</li>
                    <li>{_('help-timer-line-4')}</li>
                    <li>{_('help-timer-line-5')}</li>
                </ul>
            </div>
            <div className='ort-content'>
                <h2>{_('help-bug-header')}</h2>
                <p>{_('help-bug-line-1')}</p>
                <p><a onClick={_link} href='https://github.com/KernelZechs/open-randomizer-tracker'>https://github.com/KernelZechs/open-randomizer-tracker</a></p>
            </div>
        </Modal>;
    }

}
