export const natsWrapper = {

        client: {
            publish: jest.fn().mockImplementation((subject: string, callback: () => void) => {
                callback();
            })
        }

    }
;
