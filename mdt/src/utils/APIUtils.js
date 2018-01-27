'use strict';
import request from 'superagent';
import helpers from './Helpers';
import Config from '../config';

function getToken () {
	
	return Token;
}

const APIUtils = {

	root: Config.apiUrl,
	lastAction: null,  

	normalizeResponse(response) {
		return helpers.processObjectKeys(response, key => {
			return key;
		});
	},

	sendLastAction(){
		if(this.lastAction){
			//console.log('lastAction', this.lastAction);
			switch( this.lastAction.type){
				case 'get':
					this.get(this.lastAction.path);
				break;
				case 'post':
					this.post(this.lastAction.path, this.lastAction.body);
				break;
				case 'delete':
					this.delete(this.lastAction.path, this.lastAction.body);
				break;
				case 'put':
					this.put(this.lastAction.path, this.lastAction.body);
				break;
			}
		}
	},

	setHeaders(){
		//console.log('SET-HEADERS')
		let Token = null;
		let USER = localStorage.getItem('pn-user');
		if(USER){
			Token = JSON.parse(USER).access_token;
		}
		//console.log(Token)

		return {
			"Accept": 'application/json',
			"Content-Type": 'application/json',
			"Cache-Control": 'no-cache',
			"Authorization": 'Bearer ' + Token
		}
	},

	get(path) {
		//console.log(path)
		this.lastAction = {path: path, type: 'get'};
		return new Promise((resolve, reject) => {
			request.get(Config.apiUrl + path)
				.on('progress', function(e){
					//console.info(e);
					//console.log(e.direction,"is done",e.percent,"%");
				})
				.set(this.setHeaders())
				.withCredentials()
				.end((err, res) => {
					//console.log(err, res);
					if (err || !res.ok) {
						reject(this.normalizeResponse(err || res));
					} else {
						resolve(this.normalizeResponse(JSON.parse(res.text)));
					}
			});
		});
	},
	
	post(path, body) {
		this.lastAction = {path: path, type: 'post', body: body};
		return new Promise((resolve, reject) => {
			request.post(Config.apiUrl + path)
				.send(body)
				.set(this.setHeaders())
				.withCredentials()
				.end((err, res) => {
				console.log(err, res);
				if (err || !res.ok) {
					console.log('POST ERR');
					reject(this.normalizeResponse(err || res));
				} else {
					console.log('POST OK');
					if(res.text) {
						resolve(this.normalizeResponse(JSON.parse(res.text)));
					}else{
						resolve();
					}
				}
			});
		});
	},


	delete(path, body) {
		this.lastAction = {path: path, type: 'delete', body: body};
		return new Promise((resolve, reject) => {
			request.delete(Config.apiUrl + path)
				.send(body)
				.set(this.setHeaders())
				.withCredentials()
				.end((err, res) => {
					//console.log(err, res);
					if (err || !res.ok) {
						console.log('POST ERR');
						reject(this.normalizeResponse(err || res));
					} else {
						console.log('POST OK');
						if(res.text) {
							resolve(this.normalizeResponse(JSON.parse(res.text)));
						}else{
							resolve();
						}
					}
				});
		});
	},

	patch(path, body) {
		return new Promise((resolve, reject) => {
			request.patch(Config.apiUrl + path, body).withCredentials().end((err, res) => {
				if (err || !res.ok) {
					reject(this.normalizeResponse(err || res));
				} else {
					resolve(this.normalizeResponse(res));
				}
			});
		});
	},

	put(path, body) {
		this.lastAction = {path: path, type: 'put', body: body};
		return new Promise((resolve, reject) => {
			request.put(Config.apiUrl + path, body)
			.set(this.setHeaders())
			.withCredentials()
			.end((err, res) => {
				if (err || !res.ok) {
					reject(this.normalizeResponse(err || res));
				} else {
					resolve(this.normalizeResponse(res));
				}
			});
		});
	},

	del(path) {
		return new Promise((resolve, reject) => {
			request.del(Config.apiUrl + path).withCredentials().end((err, res) => {
				if (err || !res.ok) {
					reject(this.normalizeResponse(err || res));
				} else {
					resolve(this.normalizeResponse(res));
				}
			});
		});
	}
};
export default APIUtils;
