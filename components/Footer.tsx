import {Component} from "react";
import {config} from "../data/config";
import moment from "moment";
import * as VSCodeIcon from "react-icons/vsc";
import * as GitHubIcon from "react-icons/go";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


interface IProps {

}

interface IState {
    lastUpdate?: string,
    lastCommitLink?: string
}

export class Footer extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            lastUpdate: null,
            lastCommitLink: null,
        };
    }

    componentDidMount() {
        fetch(config.apiRepository.lastCommit)
            .then(res => res.json())
            .then(json => {
                let lastUpdateDate = json.commit.author.date;
                let lastUpdate = moment(lastUpdateDate);
                this.setState({
                    lastUpdate: lastUpdate.format('DD.MM.YYYY HH:mm'),
                    lastCommitLink: json.html_url
                });
            })

    }

    render() {
        return (
            <div className="text-center p-4 bg-light">
                Provozuje: <a href="https://filipsedivy.cz" className="text-decoration-none">Filip Šedivý</a>
                <VSCodeIcon.VscKebabVertical/>
                Poslední aktualizace: {this.state.lastUpdate ? (
                <OverlayTrigger placement="top" overlay={
                    <Tooltip id={`tooltip-last_commit-top`}>Odkaz na výpis poslední aktualizace</Tooltip>
                }>
                    <a href={this.state.lastCommitLink} target="_blank"
                       className="text-decoration-none">{this.state.lastUpdate}
                    </a>
                </OverlayTrigger>
            ) : <>Načítání dat</>}
                <VSCodeIcon.VscKebabVertical/>
                <OverlayTrigger placement="top" overlay={
                    <Tooltip id={`tooltip-github-top`}>Zdrojové kódy webu</Tooltip>
                }>
                    <a href="https://github.com/filipsedivy/coffee-page/" target="_blank" className="text-reset">
                        <GitHubIcon.GoMarkGithub/>
                    </a>
                </OverlayTrigger>
            </div>
        )
    }

}