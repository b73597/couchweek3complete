function(doc) {
	if (doc._id.substr(0,7) === "course:") {
		emit(doc._id);
	}
};