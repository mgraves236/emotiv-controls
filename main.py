import cortex as crtx
import live_advance as live

# https://medium.com/@kevinjycui/of-mice-and-mind-creating-a-simple-eeg-cursor-control-application-7fcdad703d2f
# https://youtu.be/oKvhDe7tNts?si=vNJd8VfmkXV4aWuI

if __name__ == '__main__':

    user = {
        "license": '',
        "client_id": '',
        "client_secret": '',
        "profile_name": ''
    }
    # Create new client
    # client = crtx.Cortex(user["client_id"], user["client_secret"])
    # # Run server
    # client.open()
    # # Get mental commands
    # client.get_mental_command_active_action(user["profile_name"])
    # # Finish working with the script
    # client.close_session()
    # client.disconnect_headset()
    # client.close()

    # Live session
    l = live.LiveAdvance(user["client_id"], user["client_secret"])
    l.start(user["profile_name"])

