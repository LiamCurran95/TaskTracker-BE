const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./app");
const seedDB = require("./data/seed-test");

chai.should();

chai.use(chaiHttp);

describe("Testing", () => {
	beforeEach(async () => {
		await seedDB();
	});
	describe("Testing Users", () => {
		describe("Incorrect paths", () => {
			it("Status 404 - Invalid path", (done) => {
				chai
					.request(app)
					.get("/api/cl/123")
					.end((err, res) => {
						res.should.have.status(404);
						done();
					});
			});
		});
		describe("/API/users", () => {
			it("GET - Status 200 - Return contains all users", (done) => {
				chai
					.request(app)
					.get("/api/users")
					.end((err, res) => {
						const users = res.body.users;
						users.should.have.lengthOf(6);
						users[0].username.should.eql("LiamCurran");
						done();
					});
			});
			it("POST - Status 201 - User posted ", (done) => {
				const user = {
					newUser: {
						username: "MR TaskTrack",
						email: "mremail@email.com",
						password: "Potato",
					},
				};
				chai
					.request(app)
					.post("/api/users")
					.send(user)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.msg.should.eql("User successfully created.");
						done();
					});
			});
			it("POST - Status 500 - Missing information ", (done) => {
				const user = { newUser: { username: "Name" } };
				chai
					.request(app)
					.post("/api/users")
					.send(user)
					.end((err, res) => {
						res.should.have.status(500);
						res.body.msg.should.eql("Information missing");
						done();
					});
			});
			it("POST - Status 200 - User successfully logged in", (done) => {
				const user = {
					newUser: {
						username: "Mr TaskTrack",
						email: "mremail@email.com",
						password: "Potato",
					},
				};
				const login = {
					login: {
						username: "Mr TaskTrack",
						password: "Potato",
					},
				};
				chai
					.request(app)
					.post("/api/users")
					.send(user)
					.then((res) => {
						if (res.status === 201) {
							chai
								.request(app)
								.post("/api/users/login")
								.send(login)
								.end((err, res) => {
									res.should.have.status(200);
									res.body.msg.should.eql("Successfully logged in.");
									done();
								});
						}
					});
			});
		});
		describe("/API/tasks", () => {
			it("Status 200 - Return contains all tasks", (done) => {
				chai
					.request(app)
					.get("/api/tasks")
					.end((err, res) => {
						res.should.have.status(200);
						res.body.tasks.should.have.lengthOf(6);
						done();
					});
			});
			it("Status 201 - Posted task", (done) => {
				const task = {
					task: { username: "MR TaskTrack", task: "Make post-task work" },
				};

				chai
					.request(app)
					.post("/api/tasks")
					.send(task)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.msg.should.eql("Task successfully posted.");
						done();
					});
			});
			it("Status 200 - Task marked complete / not complete", (done) => {
				const task = {
					task: {
						username: "5",
						task: "Complete task tracker",
						complete: true,
					},
				};
				chai
					.request(app)
					.patch("/api/tasks")
					.send(task)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.updatedTask.complete.should.eql(true);
						done();
					});
			});
		});
	});
});
