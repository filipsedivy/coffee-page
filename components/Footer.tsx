import {Component} from "react";
import {config} from "../data/config";
import moment from "moment";

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
                Poslední aktualizace: {this.state.lastUpdate ?
                <a href={this.state.lastCommitLink} target="_blank">{this.state.lastUpdate}</a> :
                <>Načítání dat</>}
            </div>
        )
    }

}