import mongoose from "mongoose";

// An interface that describes the properties that are required to create new Notification;
interface NotificationAttrs {
  email: string;
}

// An interface that describes the properties that a Notification model has.
interface NotificationModel extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

//  An interface that describes the properties that a Notification Document has.
//  Properties a single Notification has.

interface NotificationDoc extends mongoose.Document {
  email: string;
}

const notificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "pending", "sent"],
    default: "created",
  },
  type: {
    type: String,
    required: true,
    enum: ["single", "group"],
  },
});

notificationSchema.statics.build = (attrs: NotificationAttrs) =>
  new Notification(attrs);

const Notification = mongoose.model<NotificationDoc, NotificationModel>(
  "Notification",
  notificationSchema
);

export { Notification };
