<script>

    // Base code taken from https://www.youtube.com/watch?v=d620nV6bp0A, but modified to add relational speed, more sizes and different connectivity stl

    import {onMount} from 'svelte';

    export var particleColor;

    onMount(() => {
        function background () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;

            let particlesArray;


            class Particle {
                constructor(x, y, directionX, directionY, size, colour) {
                    this.x = x;
                    this.y = y;
                    this.speedX = directionX;
                    this.speedY = directionY;
                    this.size = size;
                    this.colour = colour;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.colour;
                    ctx.fill();
                }

                update() {
                    if (this.x - 50 > canvas.width || this.x + 50 < 0) {
                        this.speedX = -this.speedX;
                    }
                    if (this.y - 50 > canvas.height || this.y + 50 < 0) {
                        this.speedY = -this.speedY;
                    }

                    this.x += this.speedX;
                    this.y += this.speedY;

                    this.colour = particleColor;

                    this.draw();

                }

            }

            function init() {
                particlesArray = [];
                let numberOfParticles = (canvas.height * canvas.width) / 7000;
                for (let i = 0; i < numberOfParticles; i++) {
                    let size = Math.random() * 2 + 1;
                    let x = ((Math.random() * (canvas.width + 30)) - 15);
                    let y = ((Math.random() * (canvas.height + 30)) - 15);
                    let speedX = ((Math.random() * size) - 0.75) * (1 / (size));
                    let speedY = ((Math.random() * size) - 0.75) * (1 / (size));
                    particlesArray.push(new Particle(x, y, speedX, speedY, size, particleColor));
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();

                }
                connect();
            }

            function connect(){
                let opacity = 1;
                for (let a = 0; a < particlesArray.length; a++) {
                    for (let b = a; b < particlesArray.length; b++) {
                        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                        if (distance < (canvas.width/15) * (canvas.height/15)) {
                            opacity = 1 - (distance / 5500);
                            ctx.strokeStyle = (particleColor.substring(0, particleColor.length - 1)) + ',' + opacity + ')';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init();
            });

            init();
            animate();
        }

        background();

    });



</script>


    <canvas id="canvas"></canvas>


<style>

    #canvas {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background: black;
    }
</style>