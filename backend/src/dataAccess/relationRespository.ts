import { RelationModel, TRelation } from "../models/RelationModel";

class RelationRepository {
	async create(relation: TRelation) {
		return RelationModel.create(relation);
	}

	async find(query: { [key: string]: string | { [key: string]: string[] } }) {
		return RelationModel.findOne(query);
	}

	async findByParticipant({
		senderId,
		recipientId,
	}: {
		senderId: string;
		recipientId: string;
	}) {
		return RelationModel.findOne()
			.where("participants")
			.all([senderId, recipientId]); // both senderId and recipientId should be in the participants array
	}

	// this is to check whether a relation with relationId has the userId as it's participant
	async findByIdAndUserId({
		userId,
		relationId,
	}: {
		userId: string;
		relationId: string;
	}) {
		return RelationModel.findOne({ _id: relationId })
			.where("participants")
			.all([userId]);
	}

	async findById(id: string) {
		return RelationModel.findById(id);
	}

	async findByUserId(id: string) {
		// return RelationModel.find({ participants: { $in: [id] } });
		return RelationModel.find().where("participants").all([id]);
	}

	async update(id: string, relationData: Partial<TRelation>) {
		return RelationModel.findByIdAndUpdate(id, relationData, { new: true });
	}

	async deleteById(id: string) {
		return RelationModel.findByIdAndDelete(id);
	}

	async findAllByStatus({
		status,
		userId,
	}: {
		userId: string;
		status: TRelation["status"];
	}) {
		return RelationModel.find({ status })
			.where("participants")
			.all([userId])
			.populate({
				path: "participants",
				select: "_id name status profilePicUrl email",
			});
	}
}

export const relationRepository = new RelationRepository();
