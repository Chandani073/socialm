import { Inngest } from "inngest";
import Users from "../models/Users.js";
import UserActivation from "../models/UserActivation.js";
import Connection from "../models/Connection.js";

import sendEmail from "../utils/sendEmail.js";

// Create Inngest client
export const inngest = new Inngest({ id: "socialm-app" });

/*
|--------------------------------------------------------------------------
| USER CREATION
|--------------------------------------------------------------------------
*/

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses[0].email_address;
    let username = email.split("@")[0];

    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userData = {
      _id: id,
      email,
      full_name: `${first_name} ${last_name}`,
      profile_picture: image_url,
      username,
    };

    await UserActivation.create(userData);
  }
);

/*
|--------------------------------------------------------------------------
| USER UPDATE
|--------------------------------------------------------------------------
*/

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses[0].email_address;

    const updateUserData = {
      email,
      full_name: `${first_name} ${last_name}`,
      profile_picture: image_url,
    };

    await Users.findByIdAndUpdate(id, updateUserData, { new: true });
  }
);

/*
|--------------------------------------------------------------------------
| USER DELETION
|--------------------------------------------------------------------------
*/

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await Users.findByIdAndDelete(id);
  }
);

/*
|--------------------------------------------------------------------------
| SEND NEW CONNECTION REQUEST REMINDER
|--------------------------------------------------------------------------
*/

export const sendNewConnectionRequestReminder = inngest.createFunction(
  { id: "send-connection-request-reminder" },
  { event: "connection.request.sent" },

  async ({ event, step }) => {
    const { connectionId } = event.data;

    // First email instantly
    await step.run("send-connection-request-mail", async () => {
      const connection = await Connection.findById(connectionId)
        .populate("from_user_id")
        .populate("to_user_id");

      if (!connection) return "Connection not found";

      const subject = "New Connection Request";
      const body = `You have a new connection request from ${connection.from_user_id.full_name} (${connection.from_user_id.email}).  
Visit your dashboard: ${process.env.FRONTEND_URL}`;

      await sendEmail(connection.to_user_id.email, subject, body);
      return "Initial email sent.";
    });

    // Wait 12 hours for reminder
    const in12Hours = 12 * 60 * 60 * 1000;

    await step.sleep("wait-for-12-hours", in12Hours);

    // Reminder email
    return step.run("send-connection-request-reminder-email", async () => {
      const connection = await Connection.findById(connectionId)
        .populate("from_user_id")
        .populate("to_user_id");

      if (!connection) return "Connection not found";

      if (connection.status === "accepted") {
        return "Connection was accepted, no reminder needed.";
      }

      const subject = "Reminder: Pending Connection Request";
      const body = `You still have a pending connection request from ${connection.from_user_id.full_name} (${connection.from_user_id.email}).  
Log in to respond: ${process.env.FRONTEND_URL}`;

      await sendEmail(connection.to_user_id.email, subject, body);
      return "Reminder email sent.";
    });
  }
);

/*
|--------------------------------------------------------------------------
| EXPORT ALL FUNCTIONS
|--------------------------------------------------------------------------
*/

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequestReminder,
];
