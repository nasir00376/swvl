import mongoose from "mongoose";

// An interface that describes the properties that are required to create new Notification;
interface NotificationAttrs {
  text: string;
  type: "single" | "group",
  notificationType: "sms" | "push"
}

// An interface that describes the properties that a Notification model has.
interface NotificationModel extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

//  An interface that describes the properties that a Notification Document has.
//  Properties a single Notification has.

interface NotificationDoc extends mongoose.Document {
  text: string;
  status: "created" | "sent";
  type: "single" | "group",
  notificationType: "sms" | "push"
}

const notificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "sent"],
    default: "created",
  },
  type: {
    type: String,
    required: true,
    enum: ["single", "group"],
  },
  notificationType: {
    type: String,
    required: true,
    enum: ["sms", "push"],
  },
});

notificationSchema.statics.build = (attrs: NotificationAttrs) =>
  new Notification(attrs);

const Notification = mongoose.model<NotificationDoc, NotificationModel>(
  "Notification",
  notificationSchema
);

export { Notification };
