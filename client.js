const dnode = require('dnode');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const d = dnode.connect(8080);

d.on('remote', (remote) => {
    function startDialog() {
        rl.question('\nWhat would you like to do with an entity?\n1) CREATE\n2) READ\n3) UPDATE\n4) DELETE\n\n0 - EXIT\n\n', (answer) => {
            switch (answer) {
                case '1':
                    rl.question('Which entity would you like to create?\n', (entity) => {
                        remote.create(entity, () => {});
                        startDialog();
                    });
                    break;

                case '2':
                    break;

                case '3':
                    rl.question('Which entity, object and field would you like to update? (example: players,Diego Costa,therapists,newValue)\n', (query) => {
                        remote.update(JSON.stringify(query), () => {});
                        startDialog();
                    });
                    break;

                case '0':
                    process.exit();

                default:
                    console.log('Nothing chosen!');
                    startDialog();
            };
        });
    };

    startDialog();
});