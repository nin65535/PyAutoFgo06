import uvicorn
from selenium import webdriver


if __name__ == "__main__":

    opts = webdriver.ChromeOptions()
    opts.add_argument('window-size=800,1000')
    opts.add_experimental_option("excludeSwitches", ['enable-automation', 'load-extension'])

    driver = webdriver.Chrome(options=opts)

    driver.get('http://localhost:8081/')

    uvicorn.run("app:api",
                host="localhost",
                port=8000,
                reload=True)
