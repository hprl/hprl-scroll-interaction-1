const html = document.documentElement;
const canvas = document.getElementById('ipad-canvas');
const context = canvas.getContext('2d');
const frameCount = 114;

const currentFrame = index => (
    `https://www.apple.com/105/media/us/ipad-air/2022/5abf2ff6-ee5b-4a99-849c-a127722124cc/anim/m1/image-sequence/large/large_${index.toString().padStart(5, '0')}.jpg`
)

const img = new Image();
img.src = currentFrame(30);

img.onload = function () {
    context.drawImage(img, 0, 0);
};

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop; // 현재 스크롤의 위치
    const maxScrollTop = html.scrollHeight - window.innerHeight; // 전체 스크롤 길이 - 내부 스크린 높이 = 최대 스크롤 값
    const scrollFraction = scrollTop / maxScrollTop; // 현재 스크롤 위치 / 최대 스크롤 값 = 현재 스크롤 위치의 백분율 ex) 50 / 100 = 0.5 즉 50%
    const frame = Math.ceil(frameCount * scrollFraction) // 백분율 * 프레임수 = 전체 프레임중 백분율에 해당하는 프레임 ex) 0.5 * 총 100컷 = 50번째 컷
                                                            // 나온 컷은 소수이기에 소숫점 올림하여 정수로 변환

    // const c = Math.min(a, b) a , b 중 작은 값을 c에 할당
    // 전체 프레임 컷보다 커지면 안되기 때문에
    const frameIndex = Math.min(frameCount, frame);

    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
    }

    requestAnimationFrame(() => updateImage(frameIndex))
})